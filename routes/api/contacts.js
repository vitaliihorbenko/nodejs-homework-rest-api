const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const [contact] = await getContactById(contactId);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } else {
    next();
  }
});

router.post("/", async (req, res, next) => {
  const result = await addContact(req.body);
  if (result.error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removeCnt = await removeContact(contactId);
  if (removeCnt) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  if (Object.entries(req.body).length) {
    const result = await updateContact(contactId, req.body);
    if (result.error) {
      res.status(400).json({ message: result.error.message });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: result,
      });
    }
  } else {
    res.status(400).json({ message: "missing fields" });
  }
});

module.exports = router;
