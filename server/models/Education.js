const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const validateHighLevelFields = function () {
  if (this.highLevel) {
    return this.university && this.major && this.startDate && this.endDate;
  }
  return true;
};

const validateGraduationDate = function () {
  if (this.graduated) {
    return Boolean(this.graduationDate);
  }
  return true;
};

const educationSchema = new Schema(
  {
    level: {
      type: String,
      required: [true, 'Education level is required'],
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
      validate: {
        validator: validateHighLevelFields,
        message:
          'University is required',
      },
    },
    major: {
      type: String,
      validate: {
        validator: validateHighLevelFields,
        message:
          'Major is required',
      },
    },
    startDate: {
      type: Date,
      validate: {
        validator: validateHighLevelFields,
        message:
          'Start Date is required',
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: validateHighLevelFields,
        message:
          'End Date is required',
      },
    },
    graduationDate: {
      type: Date,
      validate: {
        validator: validateGraduationDate,
        message: 'Graduation date is required',
      },
    },
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
