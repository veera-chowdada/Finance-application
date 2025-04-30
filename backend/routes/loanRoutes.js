// routes/loanRoutes.js
const express = require('express');
const Loan = require('../models/loanModel');
const router = express.Router();

// Add Loan
router.post('/', async (req, res) => {
  const { userId, amount, startDate, endDate, status } = req.body;

  try {
    const newLoan = new Loan({ userId, amount, startDate, endDate, status });
    await newLoan.save();
    res.status(201).json({ message: 'Loan added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId', 'name email phone');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Loan by ID
router.get('/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('userId', 'name email phone');
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Loan
router.put('/:id', async (req, res) => {
  const { amount, startDate, endDate, status } = req.body;

  try {
    const loan = await Loan.findByIdAndUpdate(req.params.id, { amount, startDate, endDate, status }, { new: true });
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json({ message: 'Loan updated successfully', loan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Loan
router.delete('/:id', async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;