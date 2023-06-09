const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const message = (room, username, currentMessage) => {
  return {
    room: room,
    author: username,
    message: currentMessage,
  };
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 방 접속
  socket.on("join_room", (data) => {
    socket.join(data);
    socket
      .to(data.room)
      .emit("receive_message", message(data.room, "관리자", "환영합니다"));
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  // 메시지 보내기
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => console.log("SERVER RUNNING"));
