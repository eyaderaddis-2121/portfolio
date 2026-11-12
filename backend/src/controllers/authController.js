const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
      }

      const admin = await AdminModel.findByEmail(email);
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, admin.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
      }

      const token = signToken(admin.id);

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: { id: admin.id, name: admin.name, email: admin.email },
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async me(req, res) {
    // req.admin is set by the auth middleware
    return res.json({ success: true, data: req.admin });
  },

  async logout(req, res) {
    // JWT is stateless — client just discards the token.
    return res.json({ success: true, message: 'Logged out successfully.' });
  },
};

module.exports = authController;
