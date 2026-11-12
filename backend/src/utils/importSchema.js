/**
 * Import schema to TiDB Cloud
 * Run: node src/utils/importSchema.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

async function importSchema() {
  console.log('Connecting to TiDB Cloud...');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('DB:  ', process.env.DB_NAME);

  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || '4000'),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl:      { rejectUnauthorized: true },
    multipleStatements: true,
  });

  console.log('✅ Connected to TiDB Cloud');

  // Create database if not exists
  await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await conn.execute(`USE \`${process.env.DB_NAME}\``);
  console.log('✅ Using database:', process.env.DB_NAME);

  // Read and run schema
  const schemaPath = path.join(__dirname, '../../database/schema.sql');
  let schema = fs.readFileSync(schemaPath, 'utf8');

  // Remove the USE statement — already selected above
  schema = schema.replace(/USE\s+portfolio\s*;/gi, '');

  // Split on semicolons and run each statement
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const stmt of statements) {
    try {
      await conn.execute(stmt);
      const match = stmt.match(/CREATE TABLE IF NOT EXISTS\s+(\w+)/i);
      if (match) console.log('✅ Table created:', match[1]);
    } catch (err) {
      if (!err.message.includes('already exists')) {
        console.warn('⚠️  Statement warning:', err.message.substring(0, 80));
      }
    }
  }

  console.log('\n✅ Schema imported successfully!');

  // Verify tables
  const [tables] = await conn.execute('SHOW TABLES');
  console.log('\nTables in database:');
  tables.forEach(t => console.log(' -', Object.values(t)[0]));

  await conn.end();
  process.exit(0);
}

importSchema().catch(err => {
  console.error('❌ Import failed:', err.message);
  process.exit(1);
});
