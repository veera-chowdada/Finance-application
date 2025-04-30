const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'completed'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;