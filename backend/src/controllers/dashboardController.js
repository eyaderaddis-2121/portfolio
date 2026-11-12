const MessageModel = require('../models/messageModel');
const { pool } = require('../config/db');

const dashboardController = {
  async stats(req, res) {
    try {
      const msgStats  = await MessageModel.getStats();
      const recent    = await MessageModel.getRecent(5);

      // Count projects
      const [projRows] = await pool.execute('SELECT COUNT(*) as total FROM projects WHERE is_active = 1');
      const totalProjects = projRows[0].total;

      return res.json({
        success: true,
        data: {
          messages: {
            total:      parseInt(msgStats.total),
            unread:     parseInt(msgStats.unread),
            read:       parseInt(msgStats.read_count),
          },
          total_projects: parseInt(totalProjects),
          recent_messages: recent,
        },
      });
    } catch (err) {
      console.error('Dashboard error:', err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

module.exports = dashboardController;
