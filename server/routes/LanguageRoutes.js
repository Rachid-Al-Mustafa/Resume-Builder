const express = require("express");
const router = express.Router();
const {
  NewLanguage,
  PopulateLanguages,
} = require('../controllers/LanguageController');

router.post('/createLanguage', NewLanguage);

router.post('/getLanguages', PopulateLanguages);

module.exports = router;