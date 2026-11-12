const { pool } = require('../config/db');

const EducationModel = {
  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM education WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    return rows;
  },

  async create({ degree, institution, location, period, description, sort_order }) {
    const [result] = await pool.execute(
      'INSERT INTO education (degree, institution, location, period, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [degree, institution, location || null, period, description || null, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const { degree, institution, location, period, description, sort_order, is_active } = fields;
    const [result] = await pool.execute(
      'UPDATE education SET degree=?, institution=?, location=?, period=?, description=?, sort_order=?, is_active=? WHERE id=?',
      [degree, institution, location || null, period, description || null, sort_order || 0, is_active !== false ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM education WHERE id=?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = EducationModel;
