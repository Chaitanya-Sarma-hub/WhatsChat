const { Schema, default: mongoose } = require("mongoose");

const messageModel = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    trim: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
