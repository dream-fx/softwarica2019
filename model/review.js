const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema({
  review: {
    type: String
  },
  rating: {
    type: Number
  },
  reviewCreatedAt: {
    type: Date
  },
  authorH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home"
  }
});

const Review = mongoose.model("Review", reviewschema);
module.exports = Review;
