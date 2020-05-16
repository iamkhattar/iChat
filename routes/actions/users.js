var users = [];
const jwt = require("jsonwebtoken");
const secrettoken = require("../../config/keys").secrettoken;
const User = require("../../models/User");

const addUser = async (token, socket) => {
  const email = await getUserEmailFromMongoDB(token);
  removeUser(email);
  users.push({ email, socket });
};

const removeUser = (email) => {
  const index = users.findIndex((user) => user.email === email);
  if (index != -1) users.splice(index, 1);
};

const getSocketID = (email) => {
  const index = users.findIndex((user) => user.email === email);
  return users[index].socket;
};

const getUserEmailFromMongoDB = async (token) => {
  var userID;
  try {
    jwt.verify(token, secrettoken, (error, decoded) => {
      if (error) {
        return console.log("Invalid Token");
      } else {
        userID = decoded.user.id;
      }
    });
    if (!userID) return;

    let user = await User.findById(userID).select("-password");
    return user.email;
  } catch (err) {
    console.error("something wrong with auth middleware");
  }
};

const getUserIDFromMongoDB = async (token) => {
  var userID;
  try {
    jwt.verify(token, secrettoken, (error, decoded) => {
      if (error) {
        return console.log("Invalid Token");
      } else {
        userID = decoded.user.id;
      }
    });
    if (!userID) return;

    let user = await User.findById(userID).select("-password");
    return user._id;
  } catch (err) {
    console.error("something wrong with auth middleware");
  }
};

module.exports = { addUser, removeUser, getSocketID, getUserIDFromMongoDB };
