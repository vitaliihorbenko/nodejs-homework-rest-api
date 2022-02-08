const bcrypt = require("bcrypt");
const { BadRequest, Conflict } = require("http-errors");
const { User, joiRegisterSchema } = require("../../models/");
const gravatar = require("gravatar");
const {sendEmail} = require("../../helpers")
const { v4: uuidv4 } = require('uuid');


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
  const verificationToken = uuidv4();
  await User.create({ email, avatarURL, verificationToken, password: hashPassword });
  const mail = {
    to: email,
    subject: "Верификация email",
    html: `<a target="_blank" href="${process.env.SITE_NAME}/api/users/verify/${verificationToken}">Подтвердите свой email</a>`
  }
  await sendEmail(mail);
  res.status(201).json({
    email,
    subscription,
  });
};

module.exports = register;
