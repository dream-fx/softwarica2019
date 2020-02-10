const mongoose = require("mongoose");

const inboxschema = new mongoose.Schema({
  message: {
    type: String
  },
  messageCreatedAt: {
    type: Date
  }
});

const Inbox = mongoose.model("Inbox", inboxschema);
module.exports = Inbox;
