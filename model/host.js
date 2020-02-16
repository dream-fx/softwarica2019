const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
  hostName: {
    type: String,
    required: true
  },
  hostUsername: {
    type: String,
    required:true,
    unique: true,
    minlength: 4
  },
  hostPassword: {
    type: String,
   
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
  }
});

module.exports = mongoose.model("Host", hostSchema);
