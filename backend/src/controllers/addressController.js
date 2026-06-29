const Address = require('../models/Address');

// @desc    Add new address
// @route   POST /api/v1/addresses
// @access  Private
exports.addAddress = async (req, res, next) => {
  try {
    const { fullName, phone, street, city, state, pincode, isDefault } = req.body;
    
    // If this is set to default, unset other defaults for this user
    if (isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }

    const address = await Address.create({
      user: req.user.id,
      fullName, phone, street, city, state, pincode, isDefault
    });

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user addresses
// @route   GET /api/v1/addresses
// @access  Private
exports.getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user.id, isActive: true }).sort('-createdAt');
    res.status(200).json({ success: true, count: addresses.length, data: addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Update address
// @route   PUT /api/v1/addresses/:id
// @access  Private
exports.updateAddress = async (req, res, next) => {
  try {
    let address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }

    address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

// @desc    Soft Delete address
// @route   DELETE /api/v1/addresses/:id
// @access  Private
exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    address.isActive = false;
    await address.save();
    
    res.status(200).json({ success: true, message: 'Address removed successfully' });
  } catch (error) {
    next(error);
  }
};
