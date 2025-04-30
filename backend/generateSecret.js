const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secret = generateSecret();
console.log('Your JWT Secret Token:', secret);