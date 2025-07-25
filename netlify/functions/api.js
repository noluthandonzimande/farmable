const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Import models
const Crop = require('../../farming-backend/models/Crop');
const User = require('../../farming-backend/models/User');

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Get all crops
app.get('/api/crops', async (req, res) => {
  try {
    await connectDB();
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

// Add a new crop
app.post('/api/crops', async (req, res) => {
  try {
    await connectDB();
    const { name, type, area } = req.body;
    const crop = new Crop({ name, type, area });
    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add crop' });
  }
});

// Delete a crop by ID
app.delete('/api/crops/:id', async (req, res) => {
  try {
    await connectDB();
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete crop' });
  }
});

// Register a new user
app.post('/api/users/register', async (req, res) => {
  try {
    await connectDB();
    const { name, surname, email, username, password } = req.body;
    if (!name || !surname || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, surname, email, username, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered', user: { name, surname, email, username } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/users/login', async (req, res) => {
  try {
    await connectDB();
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: { name: user.name, surname: user.surname, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Farming backend API is running on Netlify Functions' });
});

// Export the serverless function
module.exports.handler = serverless(app);