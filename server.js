// server.js
import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
import express from 'express'

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {

    socket.on("join", (userId) => {

      socket.join(userId);
    });

    socket.on("privateMessage", ({ senderId, receiverId, message }) => {

      // Send message to RECEIVER
      io.to(receiverId).emit("newMessage", { senderId, message });

      // Also send message back to SENDER (for chat history UI)
      io.to(senderId).emit("newMessage", { senderId, message });
    });
  });

  httpServer.listen(3000);
});

