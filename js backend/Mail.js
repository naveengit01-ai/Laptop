// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: String,
  verified: { type: Boolean, default: false }
});

const User = mongoose.model("User", UserSchema);

// Register route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

  const user = new User({ email, password, otp });
  await user.save();

  console.log("OTP for user:", otp); // In real app send email

  res.json({ message: "OTP sent to email (check console for now)" });
});

// Verify OTP route
app.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

  user.verified = true;
  user.otp = null; // clear OTP after success
  await user.save();

  res.json({ message: "User verified & saved in DB" });
});

app.listen(5000, () => console.log("Server running on 5000"));
