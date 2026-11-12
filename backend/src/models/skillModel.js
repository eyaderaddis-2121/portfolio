const { pool } = require('../config/db');

const SkillModel = {
  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM skills WHERE is_active = 1 ORDER BY category, sort_order ASC'
    );
    // Group by category
    const grouped = rows.reduce((acc, row) => {
      if (!acc[row.category]) acc[row.category] = [];
      acc[row.category].push(row);
      return acc;
    }, {});
    return grouped;
  },

  async create({ category, name, sort_order }) {
    const [result] = await pool.execute(
      'INSERT INTO skills (category, name, sort_order) VALUES (?, ?, ?)',
      [category, name, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, { category, name, sort_order, is_active }) {
    const [result] = await pool.execute(
      'UPDATE skills SET category=?, name=?, sort_order=?, is_active=? WHERE id=?',
      [category, name, sort_order || 0, is_active !== false ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM skills WHERE id=?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = SkillModel;
