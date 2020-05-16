const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
  addUser,
  removeUser,
  getSocketID,
} = require("./routes/actions/users.js");

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
    socket.emit("serverMessage", "Welcome to iChat");
  });

  socket.on("sendMessage", ({ token, receiver, message }) => {
    console.log(token, receiver, message);
  });
});

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
