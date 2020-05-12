const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
  .then(() => console.log('Database Connected...'))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
