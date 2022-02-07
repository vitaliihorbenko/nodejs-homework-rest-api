const bcrypt = require("bcrypt");
const { BadRequest, Conflict } = require("http-errors");
const { User, joiRegisterSchema } = require("../../models/");
const gravatar = require("gravatar");


const register = async (req, res, next) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email)
  await User.create({ email, avatarURL, password: hashPassword });

  res.status(201).json({
    email,
    subscription,
  });
};

module.exports = register;
