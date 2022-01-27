const express = require("express");

const { authenticate, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.register));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
