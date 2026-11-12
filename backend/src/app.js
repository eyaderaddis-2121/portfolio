const express      = require('express');
const helmet       = require('helmet');
const cors         = require('cors');
const { generalLimiter } = require('./middleware/rateLimiter');
require('dotenv').config();

const app = express();

// ── Security headers ───────────────────────────────
app.use(helmet());

// ── CORS — allow React frontend ───────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173',
];
app.use(cors({
  origin(origin, cb) {
    // Allow requests with no origin (Postman, curl) in development
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body parsing ───────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Trust proxy (for rate limiting behind nginx/etc.) ─
app.set('trust proxy', 1);

// ── General rate limit ────────────────────────────
app.use('/api', generalLimiter);

// ── Routes ────────────────────────────────────────
app.use('/api/contact',   require('./routes/contactRoutes'));
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/admin',     require('./routes/adminRoutes'));
app.use('/api/projects',  require('./routes/projectRoutes'));
app.use('/api/subscribe', require('./routes/subscribeRoutes'));
app.use('/api',           require('./routes/portfolioRoutes')); // skills/experience/education/certificates

// ── Health check ──────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Portfolio API is running.', timestamp: new Date().toISOString() });
});

// ── 404 handler ───────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ── Global error handler ──────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
  });
});

module.exports = app;
