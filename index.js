const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { log } = require("console");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    // io.emit("message", message);
    socket.broadcast.emit("message", message);
  });
  console.log("Socket connected:", socket.id);
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

server.listen(9000, () => {
  console.log(`Server started at PORT: 9000`);
});
