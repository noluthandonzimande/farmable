require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const Crop = require('./models/Crop');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Get all crops
app.get('/api/crops', async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

// Add a new crop
app.post('/api/crops', async (req, res) => {
  try {
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
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete crop' });
  }
});

// Register a new user
app.post('/api/users/register', async (req, res) => {
  try {
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

app.get('/', (req, res) => {
  res.send('Farming backend API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});