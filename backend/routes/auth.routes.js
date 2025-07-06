const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    console.log('📥 Signup attempt received');
    const { username, email, password } = req.body;
    console.log('📩 Payload:', req.body);

    if (!username || !email || !password) {
      console.warn('⚠️ Missing fields in signup');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn('⚠️ Email already registered:', email);
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('✅ User created successfully:', username);

    // OPTIONAL: Auto-login after signup
    // const token = jwt.sign(
    //   { userId: newUser._id, email: newUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '7d' }
    // );
    // return res.status(201).json({ token, user: { id: newUser._id, username, email } });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('❌ Signup Error:', err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt received');
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn('⚠️ Missing login credentials');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.warn('❌ Invalid email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('❌ Incorrect password attempt for:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful for:', email);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Login Error:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
