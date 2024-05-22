const express = require("express");
const router = express.Router();
const {
  NewEducation,
  PopulateEducations,
  DeleteEducation,
} = require('../controllers/EducationController');

router.post('/createEducation', NewEducation);

router.post('/populateEducation', PopulateEducations);

router.post('/deleteEducation/:id', DeleteEducation);

module.exports = router;