const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');


// @route   GET /api/user
// @desc    Get logged-in user's info
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Don't return the password
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
