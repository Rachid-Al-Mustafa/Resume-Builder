const Education = require('../models/Education');
const User = require('../models/User');

const EditProfile = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No data provided for update' });
  }
  const userId = req.user.id;

  try {
    const { name, phone, email, profile } = req.body;

    const updatedFields = {
      name,
      phone,
      'profile.bio': profile.bio,
      'profile.location': profile.location,
      'profile.hobbies': profile.hobbies,
      'profile.languages': profile.languages,
      'profile.skills': profile.skills,
      'profile.resumes': profile.resumes,
      'profile.experience': profile.experience,
      'profile.university': profile.university,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: updatedFields,
      },
      { new: true, lean: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// const UserData = async (req, res) => {
//   const { username } = req.params;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const { password, ...others } = user._doc;

//     return res.status(200).json({ user: others });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

module.exports = {
  EditProfile,
  //   UserData,
};
