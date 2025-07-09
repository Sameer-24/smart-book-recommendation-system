const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/finalize-signup', authController.finalizeSignup); // ✅ New route
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', verifyToken, authController.getMe);

module.exports = router;
