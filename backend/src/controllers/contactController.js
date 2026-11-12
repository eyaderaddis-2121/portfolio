const { validationResult } = require('express-validator');
const MessageModel = require('../models/messageModel');
const { sendAdminNotification, sendVisitorConfirmation } = require('../services/emailService');

const contactController = {
  async submit(req, res) {
    try {
      // Validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { name, email, subject, message } = req.body;
      const ip_address = req.ip || req.connection.remoteAddress;

      // Save to database
      const messageId = await MessageModel.create({ name, email, subject, message, ip_address });

      // Send emails (non-blocking — don't fail the request if email is misconfigured)
      const emailPromises = [
        sendAdminNotification({ name, email, subject, message }).catch(err =>
          console.warn('Admin email failed:', err.message)
        ),
        sendVisitorConfirmation({ name, email, subject }).catch(err =>
          console.warn('Visitor confirmation email failed:', err.message)
        ),
      ];
      await Promise.all(emailPromises);

      return res.status(201).json({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.',
        data: { id: messageId },
      });
    } catch (err) {
      console.error('Contact submit error:', err);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.',
      });
    }
  },
};

module.exports = contactController;
