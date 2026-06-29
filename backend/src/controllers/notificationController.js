const Notification = require('../models/Notification');

// @desc    Get user's notifications
// @route   GET /api/v1/notifications/my
// @access  Private
exports.getMyNotifications = async (req, res, next) => {
  try {
    // Fetch notifications specific to the user, OR broadcast notifications (user: null)
    // Sort by newest first
    const notifications = await Notification.find({
      $or: [{ user: req.user.id }, { user: null }]
    }).sort('-createdAt').limit(50); // limit to recent 50
    
    // Count unread
    const unreadCount = notifications.filter(n => !n.isRead).length;

    res.status(200).json({ success: true, unreadCount, data: notifications });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a notification as read
// @route   PUT /api/v1/notifications/mark-read/:id
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, user: req.user.id });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/v1/notifications/mark-all-read
// @access  Private
exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a notification
// @route   DELETE /api/v1/notifications/delete/:id
// @access  Private
exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, user: req.user.id });
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    
    await notification.deleteOne();
    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a broadcast/promo notification (Admin)
// @route   POST /api/v1/notifications/broadcast
// @access  Private/Admin
exports.createBroadcast = async (req, res, next) => {
  try {
    const { title, message, actionUrl } = req.body;
    
    const notification = await Notification.create({
      user: null, // broadcast
      title,
      message,
      type: 'Promotion',
      actionUrl
    });

    res.status(201).json({ success: true, message: 'Broadcast sent', data: notification });
  } catch (error) {
    next(error);
  }
};
