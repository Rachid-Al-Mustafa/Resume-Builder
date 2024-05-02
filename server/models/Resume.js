const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Resume schema with the given specifications
const resumeSchema = new Schema(
  {
    resumeName: {
      type: String,
      required: [true, 'Resume name is required'],
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
