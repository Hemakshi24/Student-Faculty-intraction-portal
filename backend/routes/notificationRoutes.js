const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /api/notifications - get notifications for user (auth)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const results = await Notification.find({ $or: [{ to: "all" }, { to: user.email }] }).sort({ createdAt: -1 }).limit(200);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/notifications - create notification (auth)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { to = "all", title, body, data } = req.body;
    const n = await Notification.create({ to, title, body, data });
    // emit via io if available
    if (req.app.get("io")) {
      req.app.get("io").emit("notification", n);
    }
    res.json(n);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/notifications/:id/read - mark read
router.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const n = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(n);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
