/**
 * Portfolio data controllers:
 * Skills, Experience, Education, Certificates
 * Public GET + Admin CRUD
 */
const SkillModel       = require('../models/skillModel');
const ExperienceModel  = require('../models/experienceModel');
const EducationModel   = require('../models/educationModel');
const CertificateModel = require('../models/certificateModel');

// ─── Skills ──────────────────────────────────────────────────────
const skillsController = {
  async getAll(req, res) {
    try {
      const data = await SkillModel.getAll();
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async create(req, res) {
    try {
      const { category, name, sort_order } = req.body;
      if (!category || !name) {
        return res.status(400).json({ success: false, message: 'Category and name are required.' });
      }
      const id = await SkillModel.create({ category, name, sort_order });
      return res.status(201).json({ success: true, data: { id, category, name, sort_order } });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async update(req, res) {
    try {
      const ok = await SkillModel.update(req.params.id, req.body);
      if (!ok) return res.status(404).json({ success: false, message: 'Skill not found.' });
      return res.json({ success: true, message: 'Skill updated.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async delete(req, res) {
    try {
      const ok = await SkillModel.delete(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: 'Skill not found.' });
      return res.json({ success: true, message: 'Skill deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

// ─── Experience ───────────────────────────────────────────────────
const experienceController = {
  async getAll(req, res) {
    try {
      const data = await ExperienceModel.getAll();
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async create(req, res) {
    try {
      const { role, company, period, description, sort_order } = req.body;
      if (!role || !company || !period) {
        return res.status(400).json({ success: false, message: 'Role, company, and period are required.' });
      }
      const id = await ExperienceModel.create({ role, company, period, description, sort_order });
      return res.status(201).json({ success: true, data: { id, role, company, period, description } });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async update(req, res) {
    try {
      const ok = await ExperienceModel.update(req.params.id, req.body);
      if (!ok) return res.status(404).json({ success: false, message: 'Experience not found.' });
      return res.json({ success: true, message: 'Experience updated.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async delete(req, res) {
    try {
      const ok = await ExperienceModel.delete(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: 'Experience not found.' });
      return res.json({ success: true, message: 'Experience deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

// ─── Education ────────────────────────────────────────────────────
const educationController = {
  async getAll(req, res) {
    try {
      const data = await EducationModel.getAll();
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async create(req, res) {
    try {
      const { degree, institution, location, period, description, sort_order } = req.body;
      if (!degree || !institution || !period) {
        return res.status(400).json({ success: false, message: 'Degree, institution, and period are required.' });
      }
      const id = await EducationModel.create({ degree, institution, location, period, description, sort_order });
      return res.status(201).json({ success: true, data: { id, degree, institution, location, period } });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async update(req, res) {
    try {
      const ok = await EducationModel.update(req.params.id, req.body);
      if (!ok) return res.status(404).json({ success: false, message: 'Education not found.' });
      return res.json({ success: true, message: 'Education updated.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async delete(req, res) {
    try {
      const ok = await EducationModel.delete(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: 'Education not found.' });
      return res.json({ success: true, message: 'Education deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

// ─── Certificates ─────────────────────────────────────────────────
const certificateController = {
  async getAll(req, res) {
    try {
      const data = await CertificateModel.getAll();
      return res.json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async create(req, res) {
    try {
      const { title, issuer, issue_date, cert_url, sort_order } = req.body;
      if (!title || !issuer) {
        return res.status(400).json({ success: false, message: 'Title and issuer are required.' });
      }
      const id = await CertificateModel.create({ title, issuer, issue_date, cert_url, sort_order });
      return res.status(201).json({ success: true, data: { id, title, issuer, cert_url } });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async update(req, res) {
    try {
      const ok = await CertificateModel.update(req.params.id, req.body);
      if (!ok) return res.status(404).json({ success: false, message: 'Certificate not found.' });
      return res.json({ success: true, message: 'Certificate updated.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  async delete(req, res) {
    try {
      const ok = await CertificateModel.delete(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: 'Certificate not found.' });
      return res.json({ success: true, message: 'Certificate deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

module.exports = { skillsController, experienceController, educationController, certificateController };
