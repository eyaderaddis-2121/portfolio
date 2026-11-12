/**
 * Run once to create the initial admin account:
 *   node src/utils/setupAdmin.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const bcrypt     = require('bcryptjs');
const { pool, testConnection } = require('../config/db');

async function setup() {
  await testConnection();

  // Check if admin already exists
  const [existing] = await pool.execute('SELECT COUNT(*) as total FROM admins');
  if (existing[0].total > 0) {
    console.log('⚠️  Admin already exists. Skipping setup.');
    process.exit(0);
  }

  // ── Customize these before running ──────────
  const name     = 'Eyaderaddis Belete';
  const email    = 'Eyaderaddisbelete@gmail.com';
  const password = 'Admin@2026!';        // ← CHANGE BEFORE RUNNING
  // ────────────────────────────────────────────

  const hash = await bcrypt.hash(password, 12);

  await pool.execute(
    'INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  console.log('✅  Admin created successfully!');
  console.log('   Email:   ', email);
  console.log('   Password:', password);
  console.log('\n⚠️  Change your password after first login!');
  process.exit(0);
}

setup().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
