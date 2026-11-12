const { pool } = require('../config/db');

const ExperienceModel = {
  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM experience WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    return rows;
  },

  async create({ role, company, period, description, sort_order }) {
    const [result] = await pool.execute(
      'INSERT INTO experience (role, company, period, description, sort_order) VALUES (?, ?, ?, ?, ?)',
      [role, company, period, description || null, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, { role, company, period, description, sort_order, is_active }) {
    const [result] = await pool.execute(
      'UPDATE experience SET role=?, company=?, period=?, description=?, sort_order=?, is_active=? WHERE id=?',
      [role, company, period, description || null, sort_order || 0, is_active !== false ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM experience WHERE id=?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = ExperienceModel;
