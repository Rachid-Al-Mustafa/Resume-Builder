const Language = require('../models/Skill');

const NewLanguage = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No data provided for update' });
  }

  try {
    const { name, level } = req.body;

    const newLanguage = new Language({
      name,
      level,
    });

    const savedLanguage = await newLanguage.save();

    return res.status(200).json({
      message: 'Language created successfully',
      language: savedLanguage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const PopulateLanguages = async (req, res) => {
  try {
    const languageIds = req.body;
    if (!languageIds || !Array.isArray(languageIds)) {
      return res.status(400).json({
        message: 'Invalid input. An array of Skill ObjectIDs is required.',
      });
    }

    const languages = await Language.find({
      _id: { $in: languageIds },
    });

    res.status(200).json({ languages });
  } catch (error) {
    console.error('Error retrieving skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  NewLanguage,
  PopulateLanguages,
};
