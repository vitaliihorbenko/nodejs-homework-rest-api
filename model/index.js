// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const listContacts = async () => {}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const element = await getContactById(contactId);
    const idx = data.findIndex((el) => el.id === contactId);
    if (idx !== -1) {
      data.splice(idx, 1);
    }

    await fs.writeFile(contactsPath, JSON.stringify(data));
    return element;
  } catch (err) {
    console.error(err);
  }
};


const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
