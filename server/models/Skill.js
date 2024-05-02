const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
  },
  level: {
    type: String,
    required: [true, 'Skill level is required'],
  },
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;