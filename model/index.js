const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const result = JSON.parse(contacts);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.filter((el) => contactId === el.id);
  return contact;
};

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

const addContact = async (body) => {
  try {
    const contacts = JSON.stringify(body);
    fs.writeFile(contactsPath, contacts);
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contactItem = getContactById(contactId);
  if (name) contactItem.name = name;
  if (email) contactItem.email = email;
  if (phone) contactItem.phone = phone;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
