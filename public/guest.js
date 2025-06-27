const socket = io();

socket.on("startCall", () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    document.getElementById("remoteVideo").srcObject = stream;
  });
});
