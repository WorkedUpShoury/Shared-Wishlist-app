const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  wishlist: [
    {
      productId: String,
      productName: String,
      productImage: String,
      price: Number
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
