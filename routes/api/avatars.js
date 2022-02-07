const express = require("express");
const router = express.Router();

const { authenticate, upload, ctrlWrapper} = require("../../middlewares");
const { avatars: ctrl } = require("../../controllers");

router.get("/", authenticate, ctrlWrapper(ctrl.getAvatars))

router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatars));

module.exports = router;