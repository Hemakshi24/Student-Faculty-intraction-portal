// backend/server.js (completed)
// Using CommonJS to match existing routes
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const { authMiddleware, requireRole } = require("./middleware/authMiddleware");

const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

// Socket.io for real-time chat
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// simple protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

// Chat REST endpoint to get last messages
app.get("/api/messages", async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: 1 }).limit(200);
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  // Join room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(socket.id, "joined room", room);
  });

  // Handle incoming chat message
  socket.on("chatMessage", async (data) => {
    // data: { room, from, text }
    try {
      const msg = new Message({
        room: data.room || "global",
        from: data.from || "Anonymous",
        text: data.text || "",
      });
      await msg.save();
      // emit to room
      io.to(data.room || "global").emit("chatMessage", msg);
    } catch (err) {
      console.error("Error saving message:", err);
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

const fileRoutes = require("./routes/fileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const path = require("path");
const fs = require("fs");

// serve uploads folder
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// make io available on req.app
app.set("io", io);

// mount routes
app.use("/api/files", fileRoutes);
app.use("/api/notifications", notificationRoutes);

// serve a tiny demo frontend (chat + upload + video test)
app.use("/demo", express.static(path.join(__dirname, "public")));

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portal_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// export for testing
module.exports = { app, server, io };
