const { NotFound } = require("http-errors");
const { User} = require("../../models/");



const verification = async (req, res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken})
    if(!user) {
        throw new NotFound()
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null})
    res.status(200).json("Verification successful")
}

module.exports = verification;