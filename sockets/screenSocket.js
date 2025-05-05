function screenSocket(socket, io) {
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("screen-data", ({ room, data }) => {
    socket.to(room).emit("screen-data", data);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
  });
}

module.exports = screenSocket;
