const express = require("express");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
// const { ctrlWrapper, validation } = require("../../middlewares");
// const { contacts: ctrl } = require("../../controllers");
const { User, joiRegisterSchema, joiLoginSchema } = require("../../models/");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password, subscription = "starter" } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: hashPassword });

    res.status(201).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Unauthorized("Email or password is wrong");
    }
    const token = "165456.sdfdsaf.1231564";
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
