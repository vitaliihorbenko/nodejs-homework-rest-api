const express = require("express");
const router = express.Router();
const { listContacts, getContactById } = require("../../model");

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
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
    // next();
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
