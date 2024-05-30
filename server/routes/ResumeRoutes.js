const express = require('express');
const router = express.Router();
const {
  NewResume,
  GetResume,
  DeleteResume,
} = require('../controllers/ResumeController');

router.post('/resume', NewResume);
router.post('/resumes', GetResume);
router.post('/:id', DeleteResume);

module.exports = router;
