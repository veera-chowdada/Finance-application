const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  amountPaid: { type: Number, required: true },
  month: { type: Number, required: true },
  paymentDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'pending'], required: true },
});

const Repayment = mongoose.model('Repayment', repaymentSchema);

module.exports = Repayment;