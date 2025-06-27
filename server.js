const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

// CORREGIR CSP:
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src *; img-src 'self' data:; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Servir archivos estáticos
app.use(express.static(__dirname));

// WebSocket
io.on("connection", (socket) => {
  console.log("🔌 Usuario conectado");

  socket.on("oferta", (description) => {
    socket.broadcast.emit("oferta", description);
  });

  socket.on("respuesta", (description) => {
    socket.broadcast.emit("respuesta", description);
  });

  socket.on("ice-candidate", (candidate) => {
    socket.broadcast.emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
