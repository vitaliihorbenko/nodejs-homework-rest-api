const express = require("express");
const router = express.Router();


const { authenticate, ctrlWrapper } = require("../../middlewares");
const { users: ctrl, auth } = require("../../controllers");


router.get("/current", authenticate, ctrlWrapper(ctrl.current));

router.get("/verify/:verificationToken", ctrlWrapper(auth.verification))

router.post("/verify", ctrlWrapper(auth.reVerify))



module.exports = router;
