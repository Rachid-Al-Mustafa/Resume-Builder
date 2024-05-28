const express = require('express');
const router = express.Router();
const {
  NewExperience,
  PopulateExperiences,
  DeleteExperience,
} = require('../controllers/ExperienceController');

router.post('/experience', NewExperience);
router.post('/experiences', PopulateExperiences);
router.delete('/experience/:id', DeleteExperience);

module.exports = router;
