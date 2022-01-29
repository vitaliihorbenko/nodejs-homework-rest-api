const { Contact, schemas } = require("../../models");
const { NotFound, BadRequest, Unauthorized } = require("http-errors");

const updateById = async (req, res, next) => {
  const { error } = schemas.contactUpdate.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  if (!Object.entries(req.body).length) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const { contactId: id } = req.params;
  const contact = await Contact.findOne({ _id: id, owner: req.user._id });
  if (!contact) {
    throw new Unauthorized();
  }
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw NotFound();
  }
  res.json(updateContact);
};

module.exports = updateById;
