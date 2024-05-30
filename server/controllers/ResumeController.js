const Resume = require('../models/Resume');

const NewResume = async (req, res) => {
  try {
    const { resumeName } = req.body;

    if (!resumeName) {
      return res.status(400).json({ message: 'Resume name is required' });
    }

    const newResume = new Resume({
      resumeName,
      sections: [],
    });

    await newResume.save();

    res.status(200).json(newResume);
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const GetResume = async (req, res) => {
  const { id } = req.params;
  try {
    const populatedResume = await Resume.findById(id);
    if (!populatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(populatedResume);
  } catch (error) {
    console.error('Error retrieving resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const DeleteResume = async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await Resume.findByIdAndDelete(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  NewResume,
  GetResume,
  DeleteResume,
};
