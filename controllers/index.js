const contacts = require("./contacts");

module.exports = {
  contacts,
};

// router.get("/", async (req, res, next) => {
//   const contacts = await listContacts();
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       contacts,
//     },
//   });
// });

// router.get("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const [contact] = await getContactById(contactId);
//   if (contact) {
//     res.json({
//       status: "success",
//       code: 200,
//       data: { contact },
//     });
//   } else {
//     next();
//   }
// });

// router.post("/", async (req, res, next) => {
//   const data = await listContacts();

//   const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     phone: Joi.string().required(),
//   });

//   const validationResult = schema.validate(req.body);
//   if (validationResult.error) {
//     res.status(400).json({ message: "missing required name field" });
//   }
//   const { name, email, phone } = req.body;
//   const newContact = {
//     id: uuidv4(),
//     name,
//     email,
//     phone,
//   };
//   data.push(newContact);
//   addContact(data);

//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: { newContact },
//   });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const removeCnt = await removeContact(contactId);
//   if (removeCnt) {
//     res.status(200).json({ message: "contact deleted" });
//   } else {
//     next();
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   if (req.body) {
//     updateContact(contactId, req.body);

//     res.json({
//       status: "success",
//       code: 200,
//     });
//   } else {
//     res.status(400).json({ message: "missing fields" });
//   }
// });
