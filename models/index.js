const { Contact, schemas } = require("./schemas/contact");
const { User, joiRegisterSchema, joiLoginSchema } = require("./schemas/user");

module.exports = { Contact, schemas, User, joiRegisterSchema, joiLoginSchema };
