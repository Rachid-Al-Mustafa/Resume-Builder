const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( 
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      required: [true, 'Name is required'],
      unique: [true, 'Username has already been taken'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Account already exists! Login instead'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: [true, 'Phone Number already exists! Change Phone Number'],
    },
    password: {
      type: String,
      required: true,
      min: [8, 'Password must be at least 8 characters'],
    },
    profile: {
      profileImage: String,
      coverImage: String,
      university: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Education',
        },
      ],
      experience: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Experience',
        },
      ],
      resumes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Resume',
        },
      ],
      location: String,
      bio: String,
      skills: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill',
        },
      ],
      languages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill',
        },
      ],
      hobbies: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
