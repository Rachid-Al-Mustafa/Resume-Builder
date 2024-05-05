const express = require("express");
const router = express.Router();
const { EditProfile } = require("../controllers/UserController");
// const { EditProfile, UserData } = require('../controllers/UserController');

router.post("/edit-profile", EditProfile);

// router.get("/:username", UserData)

module.exports = router;