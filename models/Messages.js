const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
  },
  history: [
    {
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Messages = mongoose.model("messages", MessagesSchema);
