const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Conexión WebSocket con los clientes
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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
