const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const educationSchema = new Schema(
  {
    level: {
      type: String,
      required: true,
    },
    highLevel: {
      type: Boolean,
      required: true,
    },
    graduated: {
      type: Boolean,
      default: false,
    },
    university: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    graduationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
