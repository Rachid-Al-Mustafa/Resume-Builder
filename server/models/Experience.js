const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEndDate = function () {
  if (!this.stillWorking) {
    return Boolean(this.endDate);
  }
  return true;
};

const experienceSchema = new Schema(
  {
    companyName: {
      type: String,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
    },
    tasks: {
      type: String,
      required: [true, 'Tasks/responsibilities are required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      validate: {
        validator: validateEndDate,
        message: 'End date is required if not still working.',
      },
    },
    stillWorking: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
