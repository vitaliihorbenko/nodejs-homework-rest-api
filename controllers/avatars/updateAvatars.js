const fs = require('fs/promises');
const path = require('path');
const {User} = require('../../models');
const Jimp = require('jimp');

const updateAvatars = async (req, res) => {
    const {_id} = req.user;

    const {path:tempDir, originalname} = req.file;

    const [extension] = originalname.split('.').reverse();
    const filename = `${_id}_avatar.${extension}`;

    const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename);

    const avatar = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, {avatarURL:avatar}, {new: true});


    const image = await Jimp.read(tempDir);
    image.resize(250, 250).write(uploadDir);
    await fs.unlink(tempDir);

    res.json({
        message: "Avatar is updated",
        code: 200,
        body: {
            avatar
        }
    })
}

module.exports = updateAvatars;