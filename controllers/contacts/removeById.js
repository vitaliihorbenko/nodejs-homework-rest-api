const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  const { contactId: id } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(id);
  if (!deleteContact) {
    throw NotFound();
  }
  res.json({ message: "Delete success" });
};

module.exports = removeById;
