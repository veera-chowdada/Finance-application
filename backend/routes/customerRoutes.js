// routes/customerRoutes.js
const express = require('express');
const User = require('../models/userModel');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Add Customer
router.post('/', verifyToken, async (req, res) => {
  const { name, email, phone, role } = req.body;

  try {
    const newCustomer = new User({ name, email, phone, role });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Customers
router.get('/', async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });
    console.log('customers :' , customers); // Log the result
    res.json(customers);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;