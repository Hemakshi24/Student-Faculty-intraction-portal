const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

const { authMiddleware } = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

// Upload folder
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/files/upload - upload file (auth required)
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    // create notification for admin or the intended recipient
    const notif = await Notification.create({
      to: "all",
      title: "New file uploaded",
      body: `${req.user.name} uploaded ${req.file.originalname}`,
      data: { filename: req.file.filename, originalname: req.file.originalname }
    });
    // emit socket notification if io is attached to app
    if (req.app.get("io")) {
      req.app.get("io").emit("notification", notif);
      req.app.get("io").emit("fileUploaded", { filename: req.file.filename, originalname: req.file.originalname });
    }
    res.json({ message: "File uploaded", file: { filename: req.file.filename, originalname: req.file.originalname } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/files/:filename - stream file (supports range for video)
router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(UPLOAD_DIR, filename);
  if (!fs.existsSync(filepath)) return res.status(404).send("Not found");

  const stat = fs.statSync(filepath);
  const total = stat.size;
  const range = req.headers.range;
  const contentType = mime.getType(filepath) || "application/octet-stream";

  if (!range) {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": contentType,
    });
    fs.createReadStream(filepath).pipe(res);
  } else {
    // Parse Range
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filepath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": contentType,
    });
    file.pipe(res);
  }
});

module.exports = router;
