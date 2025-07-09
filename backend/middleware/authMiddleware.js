const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  // Log important debugging info
  console.log('🔐 Incoming auth request');
  console.log('🧁 Cookies:', req.cookies);
  console.log('🧾 Token:', token);

  if (!token) {
    console.warn('❌ No token found in cookies');
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('✅ Token verified. User:', decoded);
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
