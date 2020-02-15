const mongoose = require("mongoose");
const wishSchema = new mongoose.Schema({
  wishName: {
    type: String,
    required: true
  },
  wishDetail: {
    type: String,
    required: true
  },
  wishCategory: {
    type: String,
    required: true
  },
  wishPrice: {
    type: Number
  },
  wishLocation: {
    type: String
  },

   author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest"
}

});

module.exports = mongoose.model("Wishlist", wishSchema);
