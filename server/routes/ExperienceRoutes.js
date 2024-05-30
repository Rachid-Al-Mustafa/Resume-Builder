const express = require('express');
const router = express.Router();
const {
  NewExperience,
  PopulateExperiences,
  DeleteExperience,
} = require('../controllers/ExperienceController');

router.post('/experience', NewExperience);
router.post('/experiences', PopulateExperiences);
router.post('/:id', DeleteExperience);

module.exports = router;
