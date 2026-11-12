const { pool } = require('../config/db');

const MessageModel = {
  // Create a new contact message
  async create({ name, email, subject, message, ip_address }) {
    const [result] = await pool.execute(
      'INSERT INTO contact_messages (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, ip_address || null]
    );
    return result.insertId;
  },

  // Get all messages (admin)
  async getAll({ page = 1, limit = 20, search = '' } = {}) {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM contact_messages';
    const params = [];

    if (search) {
      query += ' WHERE name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?';
      const like = `%${search}%`;
      params.push(like, like, like, like);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.execute(query, params);

    // Count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM contact_messages';
    const countParams = [];
    if (search) {
      countQuery += ' WHERE name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?';
      const like = `%${search}%`;
      countParams.push(like, like, like, like);
    }
    const [countRows] = await pool.execute(countQuery, countParams);

    return { messages: rows, total: countRows[0].total };
  },

  // Get single message by ID
  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  // Get unread messages
  async getUnread() {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages WHERE is_read = 0 ORDER BY created_at DESC'
    );
    return rows;
  },

  // Mark as read
  async markAsRead(id) {
    const [result] = await pool.execute(
      'UPDATE contact_messages SET is_read = 1 WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  // Delete message
  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM contact_messages WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  // Stats
  async getStats() {
    const [rows] = await pool.execute(`
      SELECT
        COUNT(*) AS total,
        SUM(is_read = 0) AS unread,
        SUM(is_read = 1) AS read_count
      FROM contact_messages
    `);
    return rows[0];
  },

  // Recent messages
  async getRecent(limit = 5) {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return rows;
  },
};

module.exports = MessageModel;
