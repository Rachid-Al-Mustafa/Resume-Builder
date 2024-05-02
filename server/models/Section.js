const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Section type is required'],
      enum: ['Education', 'Experience', 'Skills', 'Projects', 'Certifications'], // Define acceptable values
    },
    title: {
      type: String,
      required: [true, 'Section title is required'],
    },
    content: {
      type: [Schema.Types.Mixed], // Array of mixed types
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0; // Ensure that content is an array and is not empty
        },
        message: 'Content must be a non-empty array',
      },
    },
  },
  { timestamps: true }
);

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
