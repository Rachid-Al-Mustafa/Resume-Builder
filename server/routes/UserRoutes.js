const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();
const { EditProfile } = require('../controllers/UserController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/edit-profile', EditProfile);

router.post(
  '/edit-profile/:imageKey',
  upload.single('image'),
  async (req, res) => {
    const { imageKey } = req.params;
      const { file } = req;
    try {

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const imgBuffer = Buffer.from(file.buffer);

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          [`profile.${imageKey}`]: {
            data: imgBuffer,
            contentType: file.mimetype,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const profileImageBase64 =
        updatedUser.profile.profileImage.data.toString('base64');
      const coverImageBase64 =
        updatedUser.profile.coverImage.data.toString('base64');

      res.status(200).json({
        message: `${imageKey} image updated successfully`,
        user: {
          ...updatedUser,
          profile: {
            ...updatedUser.profile,
            profileImage: profileImageBase64,
            coverImage: coverImageBase64,
          },
        },
      });
    } catch (error) {
      console.error(`Error updating ${imageKey} image: `, error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
