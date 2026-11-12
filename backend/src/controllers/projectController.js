const ProjectModel = require('../models/projectModel');

const projectController = {
  // Public — GET /api/projects
  async getAll(req, res) {
    try {
      const projects = await ProjectModel.getAll(true);
      return res.json({ success: true, data: projects });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // Admin — POST /api/admin/projects
  async create(req, res) {
    try {
      const { title, description, image_url, demo_url, github_url, tech_stack, featured, sort_order } = req.body;
      if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Title and description are required.' });
      }
      const id = await ProjectModel.create({ title, description, image_url, demo_url, github_url, tech_stack, featured, sort_order });
      const project = await ProjectModel.getById(id);
      return res.status(201).json({ success: true, data: project });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // Admin — PUT /api/admin/projects/:id
  async update(req, res) {
    try {
      const updated = await ProjectModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: 'Project not found.' });
      const project = await ProjectModel.getById(req.params.id);
      return res.json({ success: true, data: project });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // Admin — DELETE /api/admin/projects/:id
  async delete(req, res) {
    try {
      const deleted = await ProjectModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Project not found.' });
      return res.json({ success: true, message: 'Project deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

module.exports = projectController;
