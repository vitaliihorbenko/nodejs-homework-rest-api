const bcrypt = require("bcrypt");

const hashPassword = async (value) => {
  const salt = await bcrypt.genSalt(10);

  const result = await bcrypt.hash(value, salt);

  const compareResult = await bcrypt.compare(value, result);
};

module.exports = hashPassword;
