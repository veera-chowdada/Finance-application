// routes/repaymentRoutes.js
const express = require('express');
const Repayment = require('../models/repaymentModel');
const router = express.Router();

// Add Repayment
router.post('/', async (req, res) => {
  const { loanId, amountPaid, month, paymentDate, status } = req.body;

  try {
    const newRepayment = new Repayment({ loanId, amountPaid, month, paymentDate, status });
    await newRepayment.save();
    res.status(201).json({ message: 'Repayment added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Repayments
router.get('/', async (req, res) => {
  try {
    const repayments = await Repayment.find().populate('loanId', 'userId amount startDate endDate');
    res.json(repayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Repayment by ID
router.get('/:id', async (req, res) => {
  try {
    const repayment = await Repayment.findById(req.params.id).populate('loanId', 'userId amount startDate endDate');
    if (!repayment) return res.status(404).json({ message: 'Repayment not found' });
    res.json(repayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Repayment
router.put('/:id', async (req, res) => {
  const { amountPaid, month, paymentDate, status } = req.body;

  try {
    const repayment = await Repayment.findByIdAndUpdate(req.params.id, { amountPaid, month, paymentDate, status }, { new: true });
    if (!repayment) return res.status(404).json({ message: 'Repayment not found' });
    res.json({ message: 'Repayment updated successfully', repayment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Repayment
router.delete('/:id', async (req, res) => {
  try {
    const repayment = await Repayment.findByIdAndDelete(req.params.id);
    if (!repayment) return res.status(404).json({ message: 'Repayment not found' });
    res.json({ message: 'Repayment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;