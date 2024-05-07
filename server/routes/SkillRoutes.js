const express = require("express");
const router = express.Router();
const { NewSkill, DeleteSkill, PopulateSkills } = require('../controllers/SkillController');

router.post('/create', NewSkill);

router.delete('/delete/:id', DeleteSkill);

router.post('/getSkills', PopulateSkills);

module.exports = router;