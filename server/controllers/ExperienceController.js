const Experience = require('../models/Experience');

const NewExperience = async (req, res) => {
  try {
    const { companyName, position, tasks, startDate, endDate, stillWorking } =
      req.body;

    if (
      !position ||
      !tasks ||
      !startDate ||
      (stillWorking === false && !endDate)
    ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const experienceData = {
      companyName,
      position,
      tasks,
      startDate,
      endDate,
      stillWorking,
    };

    const newExperience = new Experience(experienceData);
    await newExperience.save();

    res.status(200).json(newExperience);
  } catch (error) {
    console.error('Error creating experience: ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const PopulateExperiences = async (req, res) => {
  try {
    const experienceIds = req.body;

    if (!Array.isArray(experienceIds) || experienceIds.length === 0) {
      return res.status(400).json({ message: 'Invalid experience IDs' });
    }

    const populatedData = await Experience.find({
      _id: { $in: experienceIds },
    });

    res.status(200).json({ data: populatedData });
  } catch (error) {
    console.error('Error retrieving experiences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const DeleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  NewExperience,
  PopulateExperiences,
  DeleteExperience,
};
