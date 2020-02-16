const mongoose = require("mongoose");
const bookingschema = new mongoose.Schema({
 
  bookIn: {
    type: String
  },
  bookOut: {
    type: String
  },
  bookPerson:{
    type:String
  },
  bookMessage:{
    type:String
  },
  authorG: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest"
  }
});

module.exports = mongoose.model("Booking", bookingschema);

