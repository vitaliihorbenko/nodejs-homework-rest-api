const express = require("express");
const router = express.Router();


const { authenticate, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");


router.get("/current", authenticate, ctrlWrapper(ctrl.current));


module.exports = router;
