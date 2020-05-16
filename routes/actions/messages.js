const User = require("../../models/User");
const Messages = require("../../models/Messages");
const moment = require("moment");

const { getUserIDFromMongoDB } = require("./users");

const sendMessage = async (senderToken, receiver, message) => {
  const sender = await getUserIDFromMongoDB(senderToken);
  const messageDocument = await Messages.findOne({ sender, receiver });

  const date = moment().format("MMMM Do");
  const time = moment().format("h:mm");

  const messageObject = { message, date, time };
  messageDocument.history.unshift(messageObject);

  await messageDocument.save();
};

const getMessages = async (userID) => {
  const user = await User.findById(userID).select("-password");

  const { friends } = user;
  var response = [];
  for (friend of friends) {
    const currentFriendUser = await User.findById(friend).select("-password");
    if (!currentFriendUser) return [];
    const { id, name, image } = currentFriendUser;
    const incomingMessages = await Messages.findOne({
      sender: friend,
      receiver: userID,
    });
    const outgoingMessages = await Messages.findOne({
      sender: userID,
      receiver: friend,
    });

    var messages = [];

    for (currentIncomingMessage of incomingMessages.history) {
      messages.push({
        message: currentIncomingMessage.message,
        date: currentIncomingMessage.date,
        time: currentIncomingMessage.time,
        type: "in",
        mongoDate: currentIncomingMessage.mongoDate,
      });
    }

    for (currentOutgoingMessages of outgoingMessages.history) {
      messages.push({
        message: currentOutgoingMessages.message,
        date: currentOutgoingMessages.date,
        time: currentOutgoingMessages.time,
        type: "out",
        mongoDate: currentOutgoingMessages.mongoDate,
      });
    }

    messages.sort(
      (a, b) =>
        new Date(a.mongoDate).getTime() - new Date(b.mongoDate).getTime()
    );

    response.push({ id, name, url: image, messages: messages });
  }
  return response;
};

module.exports = { sendMessage, getMessages };
