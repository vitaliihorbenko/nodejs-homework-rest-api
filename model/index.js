const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");

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
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = schema.validate(body);
    if (validationResult.error) {
      return validationResult;
    } else {
      const { name, email, phone } = body;
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      const data = await listContacts();
      data.push(newContact);
      const contacts = JSON.stringify(data);
      fs.writeFile(contactsPath, contacts);
      return newContact;
    }
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });
  const validationResult = schema.validate(body);
  if (validationResult.error) {
    return validationResult;
  } else {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    contacts.forEach((item) => {
      if (item.id === contactId) {
        if (name) item.name = name;
        if (email) item.email = email;
        if (phone) item.phone = phone;
      }
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    const [result] = await getContactById(contactId);
    return result;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
