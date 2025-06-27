const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("👤 Usuario conectado");

  socket.on("start-call", () => socket.broadcast.emit("start-call"));
  socket.on("show-video", () => socket.broadcast.emit("show-video"));
  socket.on("back-to-call", () => socket.broadcast.emit("back-to-call"));
});

http.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Servidor corriendo");
});