const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const getById = async (req, res, next) => {
  const { contactId: id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw NotFound;
  }
  res.json(contact);
};

module.exports = getById;
