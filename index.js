import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import changeLogRoutes from "./routes/changeLogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import collaboratorRoutes from "./routes/collaboratorRoutes.js";
import pythonRoutes from "./routes/pythonRoutes.js";
import javaRoutes from "./routes/javaRoutes.js";
import javascriptRoutes from "./routes/javascriptRoutes.js";
import cRoutes from "./routes/cRoutes.js";
import cppRoutes from "./routes/cppRoutes.js";
import swiftRoutes from "./routes/swiftRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://cocreatecolab.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/user", userRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/changelog", changeLogRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/run-python", pythonRoutes);
app.use("/api", javaRoutes);
app.use("/api", javascriptRoutes);
app.use("/api", cRoutes);
app.use("/api", cppRoutes);
app.use("/api", swiftRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", ({ documentId, user }) => {
    if (!documentId || !user || !user.email || !user.uid) {
      console.error("Invalid user data received:", user);
      return;
    }

    console.log(`User ${user.email} joined document ${documentId}`);

    socket.join(documentId);
    if (!onlineUsers[documentId]) onlineUsers[documentId] = [];

    // ✅ Add user only if not already present
    if (!onlineUsers[documentId].some((u) => u.uid === user.uid)) {
      onlineUsers[documentId].push({ uid: user.uid, email: user.email });
    }

    io.to(documentId).emit("update-users", onlineUsers[documentId]);
  });

  socket.on("send-changes", ({ documentId, content }) => {
    socket.to(documentId).emit("receive-changes", content);
  });

  socket.on("user-typing", ({ documentId }) => {
    socket.to(documentId).emit("user-typing");
  });

  socket.on("leave-document", ({ documentId, user }) => {
    if (!documentId || !user || !user.uid) return;

    console.log(`User ${user.email} left document ${documentId}`);
    if (onlineUsers[documentId]) {
      onlineUsers[documentId] = onlineUsers[documentId].filter(
        (u) => u.uid !== user.uid
      );
      io.to(documentId).emit("update-users", onlineUsers[documentId]);

      if (onlineUsers[documentId].length === 0) delete onlineUsers[documentId];
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const docId in onlineUsers) {
      onlineUsers[docId] = onlineUsers[docId].filter(
        (u) => u.socketId !== socket.id
      );
      io.to(docId).emit("update-users", onlineUsers[docId]);

      if (onlineUsers[docId].length === 0) delete onlineUsers[docId];
    }
  });
});

server.listen(5001, () => console.log("Server running on port 5001"));
