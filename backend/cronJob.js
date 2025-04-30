// cronJob.js
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Repayment = require('./models/repaymentModel');
const User = require('./models/userModel');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Twilio setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Cron job to send reminders on the 1st of every month
cron.schedule('0 0 1 * *', async () => {
  try {
    const repayments = await Repayment.find({ status: 'pending' }).populate('loanId');
    for (const repayment of repayments) {
      const user = await User.findById(repayment.loanId.userId);
      // Send email
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'EMI Payment Reminder',
        text: `Dear ${user.name},\n\nThis is a reminder to pay your EMI of ₹${repayment.amountPaid} for the month ${repayment.month}.\n\nThank you.`,
      };
      await transporter.sendMail(mailOptions);

      // Send SMS
      await client.messages.create({
        body: `Dear ${user.name}, this is a reminder to pay your EMI of ₹${repayment.amountPaid} for the month ${repayment.month}.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone,
      });
    }
    console.log('Reminders sent successfully');
  } catch (error) {
    console.error('Error sending reminders:', error.message);
  }
});