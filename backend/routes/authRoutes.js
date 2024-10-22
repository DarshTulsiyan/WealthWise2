const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// @route POST /api/auth/register
// @desc Register user
// @access Public
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

// @route POST /api/auth/login
// @desc Authenticate user and get token
// @access Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

module.exports = router;