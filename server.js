const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
  addUser,
  getSocketID,
  getUserEmailFromMongoID,
  getUserIDFromMongoDB,
} = require("./routes/actions/users");
const { sendMessage, getMessages } = require("./routes/actions/messages");

app.use(express.json({ extended: false }));

const connectMongoDB = require("./config/connection");
connectMongoDB();

app.get("/api/", (req, res) => res.send("API Running"));
app.use("/api/register", require("./routes/api/register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/fetch", require("./routes/api/fetch"));
app.use("/api/friends", require("./routes/api/friends"));

io.on("connect", (socket) => {
  socket.on("login", (token) => {
    addUser(token, socket.id);
  });

  socket.on("sendMessage", async ({ token, receiver, message }) => {
    sendMessage(token, receiver, message);
    const receiverEmail = await getUserEmailFromMongoID(receiver);
    const socketID = getSocketID(receiverEmail);
    if (socketID) {
      const receiverMessages = await getMessages(receiver);
      io.to(socketID).emit("newMessage", receiverMessages);
    }
  });

  socket.on("getMessages", async (token) => {
    const userID = await getUserIDFromMongoDB(token);
    const userEmail = await getUserEmailFromMongoID(userID);
    const socketID = getSocketID(userEmail);
    const userMessages = await getMessages(userID);
    io.to(socketID).emit("newMessage", userMessages);
  });
});

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
