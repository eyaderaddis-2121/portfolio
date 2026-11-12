const rateLimit = require('express-rate-limit');

// Contact form: max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs:        15 * 60 * 1000, // 15 minutes
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: 'Too many messages sent. Please wait 15 minutes before trying again.',
  },
});

// Auth: max 10 login attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes.',
  },
});

// General API limiter
const generalLimiter = rateLimit({
  windowMs:        1 * 60 * 1000, // 1 minute
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
});

module.exports = { contactLimiter, authLimiter, generalLimiter };
