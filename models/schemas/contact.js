const { Schema, model } = require("mongoose");
const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const joiContactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const joiStatusUpdateSchema = Joi.object({
  favorite: Joi.boolean(),
});

const contactSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const schemas = {
  contactCreate: joiContactSchema,
  contactUpdate: joiContactUpdateSchema,
  statusUpdate: joiStatusUpdateSchema,
};

const Contact = model("contact", contactSchema);
module.exports = { Contact, schemas };
