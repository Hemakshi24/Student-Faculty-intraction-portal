// seed.js - populate MongoDB with sample users and messages
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const Message = require("./models/Message");

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portal_db";

async function seed() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to", MONGO);

  // Clear users/messages
  await User.deleteMany({});
  await Message.deleteMany({});

  // Create sample users
  const users = [
    { name: "Alice Admin", email: "alice@example.com", password: "password123", role: "admin" },
    { name: "Bob Faculty", email: "bob@example.com", password: "password123", role: "faculty" },
    { name: "Charlie Student", email: "charlie@example.com", password: "password123", role: "student" },
  ];

  for (const u of users) {
    const user = new User(u);
    // User model's pre-save may hash password; try save
    await user.save();
    console.log("Created user:", user.email);
  }

  // Create sample messages
  const msgs = [
    { room: "global", from: "Alice Admin", text: "Welcome to CareLogix!" },
    { room: "global", from: "Charlie Student", text: "Hi everyone 👋" },
    { room: "support", from: "Bob Faculty", text: "If you need help, ask here." },
  ];

  for (const m of msgs) {
    const msg = new Message(m);
    await msg.save();
    console.log("Saved message:", m.text);
  }

  console.log("Seeding complete.");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
