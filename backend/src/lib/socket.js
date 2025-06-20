import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Mapping of userId to socketId
const userSocketMap = {}; // { userId: socketId }

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // or your frontend deployment URL
    credentials: true,
  },
});

// Helper to get a user's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`Mapped userId ${userId} to socket ${socket.id}`);
  }

  // Notify all clients about currently online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(`User ${userId} disconnected and removed from socket map`);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
