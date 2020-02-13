const mongoose = require("mongoose");

const bookingschema = new mongoose.Schema({
  homeName: {
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
  bookStatus: {
    type: Boolean
  },
  authorG: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest"
  }
});

const Booking = mongoose.model("Booking", bookingschema);
module.exports = Booking;
