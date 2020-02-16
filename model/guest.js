const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  guestUsername: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  guestPassword: {
    type: String,
    required: true
  },
  guestImage: {
    type: String
  },
  guestBio: {
    type: String
  },
  guestEmail: {
    type: String
  }
});

module.exports = mongoose.model("Guest", guestSchema);
