const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "faculty", "admin", "ta"], default: "student" },
  refreshTokens: { type: [String], default: [] }
}, { timestamps: true });

// Optionally, you can add helper methods later (e.g., comparePassword)

module.exports = mongoose.model("User", userSchema);
