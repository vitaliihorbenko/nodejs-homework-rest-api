const fs = require("fs/promises");
const contacts = require("./contacts.json");

const listContacts = async () => {
  try {
    const result = contacts;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
