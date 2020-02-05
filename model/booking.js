const mongoose = require("mongoose");

const bookingschema = new mongoose.Schema({
  username: {
    type: String
  },
  homeName: {
    type: String
  },
  hostName: {
    type: String
  },
  bookIn: {
    type: Date
  },
  bookOut: {
    type: Date
  },
  bookDays: {
    type: Number
  },
  bookPrice: {
    type: Number
  },
  bookTotal: {
    type: Number
  },
  bookStatus: {
    type: Boolean
  },
  bookCreatedAt: {
    type: Date
  },
  authorG: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest"
  }
});

const Booking = mongoose.model("Booking", bookingschema);
module.exports = Booking;
