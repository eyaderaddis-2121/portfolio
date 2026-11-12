const mysql = require('mysql2/promise');
require('dotenv').config();

// ── Serverless-safe pool config ───────────────────────────────────
// connectionLimit=5 keeps us within TiDB Cloud / PlanetScale free tier limits.
// The pool is created once per cold start and reused across warm invocations.

const poolConfig = {
  host:               process.env.DB_HOST     || 'localhost',
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'portfolio',
  port:               parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit:    5,      // keep low for serverless
  queueLimit:         0,
  timezone:           '+00:00',
  // TiDB Cloud / PlanetScale requires SSL in production
  ...(process.env.NODE_ENV === 'production' && process.env.DB_HOST !== 'localhost'
    ? { ssl: { rejectUnauthorized: true } }
    : {}),
};

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

// Test connection (called on server startup in development)
async function testConnection() {
  try {
    const conn = await getPool().getConnection();
    console.log('✅  MySQL connected — database:', process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error('❌  MySQL connection failed:', err.message);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw err;
  }
}

module.exports = { pool: getPool(), getPool, testConnection };
