const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    const { name, email, phone, role, password } = req.body;
  
    try {
      let hashedPassword = null;
      if (role === 'owner') {
        hashedPassword = await bcrypt.hash(password, 10);
      }
      const newUser = new User({ name, email, phone, role, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// User Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
      if (user.role !== 'owner') return res.status(400).json({ message: 'Login allowed only for owners' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;