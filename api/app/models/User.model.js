const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    max: 100,
    required: true,
    unique: true
  },
  profilePic: {
    type: String
  },
  password: {
    type: String,
    min: 5,
    max: 250,
    required: true
  },
  bio: {
    type: String
  },
  followers: [
    {
      type: String,
    }
  ],
  followings: [
    {
      type: String,
    }
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
