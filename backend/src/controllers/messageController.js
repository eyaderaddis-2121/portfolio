const MessageModel = require('../models/messageModel');
const { sendReply } = require('../services/emailService');

const messageController = {
  // GET /api/admin/messages
  async getAll(req, res) {
    try {
      const page   = parseInt(req.query.page)   || 1;
      const limit  = parseInt(req.query.limit)  || 20;
      const search = req.query.search || '';

      const { messages, total } = await MessageModel.getAll({ page, limit, search });
      return res.json({
        success: true,
        data: messages,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // GET /api/admin/messages/unread
  async getUnread(req, res) {
    try {
      const messages = await MessageModel.getUnread();
      return res.json({ success: true, data: messages, count: messages.length });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // GET /api/admin/messages/:id
  async getById(req, res) {
    try {
      const msg = await MessageModel.getById(req.params.id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });

      // Auto-mark as read when viewed
      if (!msg.is_read) await MessageModel.markAsRead(msg.id);

      return res.json({ success: true, data: { ...msg, is_read: 1 } });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // PATCH /api/admin/messages/:id  — mark read / unread
  async update(req, res) {
    try {
      const msg = await MessageModel.getById(req.params.id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });

      await MessageModel.markAsRead(req.params.id);
      return res.json({ success: true, message: 'Message marked as read.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // DELETE /api/admin/messages/:id
  async delete(req, res) {
    try {
      const deleted = await MessageModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Message not found.' });
      return res.json({ success: true, message: 'Message deleted.' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // POST /api/admin/messages/:id/reply
  async reply(req, res) {
    try {
      const { replyBody } = req.body;
      if (!replyBody || !replyBody.trim()) {
        return res.status(400).json({ success: false, message: 'Reply body is required.' });
      }

      const msg = await MessageModel.getById(req.params.id);
      if (!msg) return res.status(404).json({ success: false, message: 'Message not found.' });

      await sendReply({
        to:        msg.email,
        toName:    msg.name,
        subject:   msg.subject,
        replyBody: replyBody.trim(),
      });

      await MessageModel.markAsRead(msg.id);

      return res.json({ success: true, message: `Reply sent to ${msg.email}` });
    } catch (err) {
      console.error('Reply error:', err);
      return res.status(500).json({ success: false, message: 'Failed to send reply.' });
    }
  },
};

module.exports = messageController;
