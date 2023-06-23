const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const user = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();

const MONGOURI = "mongodb://127.0.0.1:27017/user_accounts";

app.use(bodyParser.json());
app.use(cors())

app.use("/user", user);

const User = require("./model/User");

// GET all users
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// GET a single user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

// POST a new user
app.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// DELETE a user
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// PUT/UPDATE an existing user
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

mongoose.connect(MONGOURI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(3002, () => {
      console.log(`Node is running on port 3002`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
