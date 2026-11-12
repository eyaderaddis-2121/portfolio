const SubscriberModel = require('../models/subscriberModel');

const subscribeController = {
  // POST /api/subscribe
  async subscribe(req, res) {
    try {
      const { email } = req.body;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Valid email is required.' });
      }

      const alreadyExists = await SubscriberModel.exists(email);
      if (alreadyExists) {
        return res.json({ success: true, message: 'You are already subscribed!' });
      }

      await SubscriberModel.create(email);
      return res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },

  // Admin — GET /api/admin/subscribers
  async getAll(req, res) {
    try {
      const subscribers = await SubscriberModel.getAll();
      return res.json({ success: true, data: subscribers, count: subscribers.length });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  },
};

module.exports = subscribeController;
