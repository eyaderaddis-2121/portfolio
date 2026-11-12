const { pool } = require('../config/db');

const CertificateModel = {
  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM certificates WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    return rows;
  },

  async create({ title, issuer, issue_date, cert_url, sort_order }) {
    const [result] = await pool.execute(
      'INSERT INTO certificates (title, issuer, issue_date, cert_url, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, issuer, issue_date || null, cert_url || null, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, { title, issuer, issue_date, cert_url, sort_order, is_active }) {
    const [result] = await pool.execute(
      'UPDATE certificates SET title=?, issuer=?, issue_date=?, cert_url=?, sort_order=?, is_active=? WHERE id=?',
      [title, issuer, issue_date || null, cert_url || null, sort_order || 0, is_active !== false ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM certificates WHERE id=?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = CertificateModel;
