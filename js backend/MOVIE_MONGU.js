require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Connect to MongoDB (local)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Schemas
const credentialSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String, // plain text
});

const movieSchema = new mongoose.Schema({
    name: String,
    image: String,
});

const feedbackSchema = new mongoose.Schema({
    email: String,
    comment: String,
});

// Models
const Credential = mongoose.model("Credential", credentialSchema);
const Movie = mongoose.model("Movie", movieSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

const app = express();
app.use(express.json());
app.use(cors());

// Get all collections
app.get("/Tables", async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.status(200).json(collections.map(c => c.name));
    } catch (err) {
        res.status(404).json("Failed to get the collections");
    }
});

// Signup -> create new user
app.post("/add/user", async (req, res) => {
    let { email, user, password } = req.body;
    if (!email || !user || !password) {
        return res.status(400).json("Fill the data correctly");
    }

    email = email.trim();
    user = user.trim();
    password = password.trim();

    try {
        const existingUser = await Credential.findOne({ username: user });
        if (existingUser) {
            return res.status(400).json("Username already exists");
        }

        await Credential.create({ email, username: user, password });
        res.status(200).json("User created successfully");
    } catch (err) {
        res.status(500).json("Failed to create the user");
    }
});

// Login -> check plain text password
app.post("/login", async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json("Fill username and password");
    }

    username = username.trim();
    password = password.trim();

    try {
        const user = await Credential.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json("Invalid username or password");
        }

        res.status(200).json("Login successful");
    } catch (err) {
        res.status(500).json("Server error");
    }
});

// Get username + password by username
app.get("/info/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const result = await Credential.findOne({ username }, { username: 1, password: 1, _id: 0 });
        res.status(200).json(result || {});
    } catch (err) {
        res.status(404).json("Failed to get the data");
    }
});

// Get all credentials
app.get("/cred/data", async (req, res) => {
    try {
        const result = await Credential.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json("Failed to get the credentials");
    }
});

// Get all movies
app.get("/data", async (req, res) => {
    try {
        const result = await Movie.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json("Failed in this");
    }
});

// Add comment
app.post("/add/comment", async (req, res) => {
    let { email, comment } = req.body;
    if (!email || !comment) {
        return res.status(404).json("Fill the data correctly");
    }

    email = email.trim();
    comment = comment.trim();

    try {
        await Feedback.create({ email, comment });
        res.status(200).json("Successfully inserted");
    } catch (err) {
        res.status(400).json("Error to insert");
    }
});

// Get movie image by name
app.get("/movie/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const result = await Movie.findOne({ name }, { image: 1, _id: 0 });
        res.status(200).json(result || {});
    } catch (err) {
        res.status(404).json("Failed to get the data");
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
