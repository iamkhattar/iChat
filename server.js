const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const port = 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
