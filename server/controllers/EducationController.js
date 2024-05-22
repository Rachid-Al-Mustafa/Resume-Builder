const Education = require('../models/Education');

const NewEducation = async (req, res) => {
  try {
    const {
      level,
      highLevel,
      graduated,
      university,
      major,
      startDate,
      endDate,
      graduationDate,
    } = req.body;

    if (!level || typeof highLevel === 'undefined') {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const educationData = {
      level,
      highLevel,
      graduated,
      university,
      major,
      startDate,
      endDate,
      graduationDate,
    };

    const newEducation = new Education(educationData);
    await newEducation.save();

    res.status(200).json(newEducation);
  } catch (error) {
    console.error('Error creating education: ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const PopulateEducations = async (req, res) => {
  try {
    const educationIds = req.body;

    if (!Array.isArray(educationIds) || educationIds.length === 0) {
      return res.status(400).json({ message: 'Invalid education IDs' });
    }

    const populatedData = await Education.find({ _id: { $in: educationIds } });

    res.status(200).json({ data: populatedData });
  } catch (error) {
    console.error('Error retrieving skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const DeleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  NewEducation,
  PopulateEducations,
  DeleteEducation,
};
