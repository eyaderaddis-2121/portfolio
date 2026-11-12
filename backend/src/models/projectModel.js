const { pool } = require('../config/db');

const ProjectModel = {
  async getAll(activeOnly = true) {
    const query = activeOnly
      ? 'SELECT * FROM projects WHERE is_active = 1 ORDER BY featured DESC, sort_order ASC'
      : 'SELECT * FROM projects ORDER BY sort_order ASC';
    const [rows] = await pool.execute(query);
    // Parse JSON tech_stack
    return rows.map(r => ({ ...r, tech_stack: JSON.parse(r.tech_stack || '[]') }));
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
    if (!rows[0]) return null;
    return { ...rows[0], tech_stack: JSON.parse(rows[0].tech_stack || '[]') };
  },

  async create({ title, description, image_url, demo_url, github_url, tech_stack, featured, sort_order }) {
    const [result] = await pool.execute(
      `INSERT INTO projects (title, description, image_url, demo_url, github_url, tech_stack, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, image_url || null, demo_url || null, github_url || null,
       JSON.stringify(tech_stack || []), featured ? 1 : 0, sort_order || 0]
    );
    return result.insertId;
  },

  async update(id, fields) {
    const { title, description, image_url, demo_url, github_url, tech_stack, featured, sort_order, is_active } = fields;
    const [result] = await pool.execute(
      `UPDATE projects SET title=?, description=?, image_url=?, demo_url=?, github_url=?,
       tech_stack=?, featured=?, sort_order=?, is_active=? WHERE id=?`,
      [title, description, image_url || null, demo_url || null, github_url || null,
       JSON.stringify(tech_stack || []), featured ? 1 : 0, sort_order || 0, is_active !== false ? 1 : 0, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = ProjectModel;
