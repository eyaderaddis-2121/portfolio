const express      = require('express');
const helmet       = require('helmet');
const cors         = require('cors');
const { generalLimiter } = require('./middleware/rateLimiter');
require('dotenv').config();

const app = express();

// ── Security headers ───────────────────────────────────────────
app.use(helmet());

// ── CORS ───────────────────────────────────────────────────────
// Development: allow all localhost ports
// Production:  only allow the exact deployed frontend URL (CLIENT_URL)
const devOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173',
];

function isAllowedOrigin(origin) {
  if (!origin) return true; // Postman / curl / server-to-server
  if (process.env.NODE_ENV !== 'production') {
    return devOrigins.includes(origin);
  }
  // Production: CLIENT_URL can be comma-separated list
  const allowed = (process.env.CLIENT_URL || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  return allowed.includes(origin);
}

app.use(cors({
  origin(origin, cb) {
    if (isAllowedOrigin(origin)) {
      cb(null, true);
    } else {
      cb(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials:    true,
  methods:        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Body parsing ───────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Trust proxy (Vercel sits behind a proxy) ───────────────────
app.set('trust proxy', 1);

// ── General rate limit ─────────────────────────────────────────
app.use('/api', generalLimiter);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/contact',   require('./routes/contactRoutes'));
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/admin',     require('./routes/adminRoutes'));
app.use('/api/projects',  require('./routes/projectRoutes'));
app.use('/api/subscribe', require('./routes/subscribeRoutes'));
app.use('/api',           require('./routes/portfolioRoutes'));

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success:   true,
    message:   'Portfolio API is running.',
    env:       process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found.`,
  });
});

// ── Global error handler ──────────────────────────────────────
// Never leak stack traces or credentials to the client in production
app.use((err, req, res, _next) => {
  const isProd = process.env.NODE_ENV === 'production';
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: isProd ? 'Internal server error.' : err.message,
  });
});

module.exports = app;
