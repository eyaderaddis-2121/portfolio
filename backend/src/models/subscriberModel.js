const { pool } = require('../config/db');

const SubscriberModel = {
  async create(email) {
    const [result] = await pool.execute(
      'INSERT IGNORE INTO subscribers (email) VALUES (?)',
      [email]
    );
    return result.affectedRows > 0;
  },

  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM subscribers WHERE is_active = 1 ORDER BY subscribed_at DESC'
    );
    return rows;
  },

  async exists(email) {
    const [rows] = await pool.execute('SELECT id FROM subscribers WHERE email = ?', [email]);
    return rows.length > 0;
  },
};

module.exports = SubscriberModel;
