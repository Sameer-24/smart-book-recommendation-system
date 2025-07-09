const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Standard cookie config for localhost
const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax',
  maxAge,
};

// ✅ Signup controller — only create user, do not auth yet
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      signupComplete: false,
      favoriteGenres: [],
      favoriteAuthors: []
    });

    // ✅ Do not set cookie yet
    res.status(201).json({
      message: 'Signup successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('❌ Signup error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Finalize onboarding and authenticate
exports.finalizeSignup = async (req, res) => {
  const { id, favoriteGenres, favoriteAuthors } = req.body;

  if (!id || !favoriteGenres?.length || !favoriteAuthors?.length) {
    return res.status(400).json({ message: 'All fields required.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        favoriteGenres,
        favoriteAuthors,
        signupComplete: true
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      message: 'Onboarding complete and user authenticated',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        favoriteGenres: user.favoriteGenres,
        favoriteAuthors: user.favoriteAuthors
      }
    });

  } catch (err) {
    console.error('❌ Finalize signup error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', token, cookieOptions);

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Logout
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// ✅ Get logged in user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ getMe error:', err.message);
    res.status(500).json({ message: 'Error fetching user' });
  }
};
