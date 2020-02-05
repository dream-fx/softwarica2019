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
  guestGender: {
    type: String
  },
  guestDob: {
    type: Date
  },
  guestCreatedAt: {
    type: Date
  },

  admin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Guest", guestSchema);
