const current = async (req, res, next) => {
  const { email } = req.user;
  res.json({
    email,
    subscription: req.user.subscription,
  });
};

module.exports = current;
