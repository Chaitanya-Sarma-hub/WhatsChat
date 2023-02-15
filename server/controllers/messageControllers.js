const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Message = require("../models/MessageModel");
const Chat = require("../models/ChatModel");

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed to the request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    const data = await Message.findById(message._id)
      .populate("sender", "name pic")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "name pic email",
        },
      });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message._id,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
