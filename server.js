const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

// Servir archivos estáticos (host.html y guest.html deben estar en la raíz o carpeta "public")
app.use(express.static(__dirname + '/public'));

// Rutas opcionales si los archivos están fuera de /public
// app.get('/', (req, res) => res.sendFile(__dirname + '/host.html'));
// app.get('/guest.html', (req, res) => res.sendFile(__dirname + '/guest.html'));

io.on('connection', (socket) => {
  console.log('🔌 Nuevo cliente conectado:', socket.id);

  socket.on('offer', (data) => {
    console.log('📡 Oferta recibida');
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    console.log('✅ Respuesta recibida');
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    console.log('🧊 ICE Candidate');
    socket.broadcast.emit('ice-candidate', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

http.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

