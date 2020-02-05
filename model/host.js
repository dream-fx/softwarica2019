const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  hostName: {
    type: String,
    required: true
  },
  hostUsername: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  hostPassword: {
    type: String,
    required: true
  },
  hostImage: {
    type: String
  },
  hostEmail: {
    type: String
  },
  hostLocation: {
    type: String
  },
  hostBio: {
    type: String
  },
  hostGender: {
    type: String
  },
  hostDob: {
    type: Date
  },
  hostCreatedAt: {
    type: Date
  }
});

module.exports = mongoose.model("Host", hostSchema);
