const Skill = require('../models/Skill');

const NewSkill = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No data provided for update' });
  }

  try {
    const { name, level } = req.body;

    const newSkill = new Skill({
      name,
      level,
    });

    const savedSkill = await newSkill.save();

    return res.status(200).json({
      message: 'Skill created successfully',
      skill: savedSkill,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const DeleteSkill = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No data provided for update' });
  }

  const { id } = req.params;

  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({
        message: 'Skill not found',
      });
    }

    return res.status(200).json({
      message: 'Skill deleted successfully',
      skill: deletedSkill,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const PopulateSkills = async (req, res) => {
  try {
    const skillIds = req.body;
    if (!skillIds || !Array.isArray(skillIds)) {
      return res.status(400).json({
        message: 'Invalid input. An array of Skill ObjectIDs is required.',
      });
    }

    const skills = await Skill.find({
      _id: { $in: skillIds },
    });

    res.status(200).json({ skills });
  } catch (error) {
    console.error('Error retrieving skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  NewSkill,
  DeleteSkill,
  PopulateSkills,
};
