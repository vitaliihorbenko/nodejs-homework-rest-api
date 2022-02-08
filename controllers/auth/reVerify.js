const {BadRequest, NotFound} = require("http-errors")
const {User} = require("../../models/");
const {sendEmail} = require("../../helpers")

const reVerify = async (req, res) => {
    const {email} = req.body;
    if(!email) {
        throw BadRequest("missing required field email")
    }
    const user = await User.findOne({email});
    if(!user) {
        throw NotFound();
    }
    if(user.verify) {
        throw BadRequest("Verification has already been passed")
    }
    const mail = {
        to: email,
        subject: "Верификация email",
        html: `<a target="_blank" href="${process.env.SITE_NAME}/api/users/verify/${user.verificationToken}">Подтвердите свой email</a>`
      }
     await sendEmail(mail);
     res.json({email})

}

module.exports = reVerify;