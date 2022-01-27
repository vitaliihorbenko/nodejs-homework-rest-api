const { BadRequest, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const { User, joiLoginSchema } = require("../../models/");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
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
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
