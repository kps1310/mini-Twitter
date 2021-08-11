const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      min: 5,
      max: 250,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    profilePic: {
      type: String
    },
    likes: {
      type: Number
    },
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", PostSchema);
