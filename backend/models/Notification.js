const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    to: { type: String, required: true }, // user email or "all"
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: { type: Object },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
