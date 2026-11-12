const { pool } = require('../config/db');

const AdminModel = {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, created_at FROM admins WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create({ name, email, password_hash }) {
    const [result] = await pool.execute(
      'INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, password_hash]
    );
    return result.insertId;
  },

  async count() {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM admins');
    return rows[0].total;
  },
};

module.exports = AdminModel;
