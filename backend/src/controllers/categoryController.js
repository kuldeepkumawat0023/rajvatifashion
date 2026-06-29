const Category = require('../models/Category');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('name');
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by slug or id
// @route   GET /api/v1/categories/:identifier
// @access  Public
exports.getCategory = async (req, res, next) => {
  try {
    const identifier = req.params.identifier;
    let query = { isActive: true };
    
    // Check if it's a valid object id, otherwise treat as slug
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = identifier;
    } else {
      query.slug = identifier;
    }

    const category = await Category.findOne(query);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private (Admin: MANAGE_CATEGORIES)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, isActive } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'categories');
      imageUrl = result.secure_url;
    }

    const category = await Category.create({
      name,
      description,
      image: imageUrl,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private (Admin: MANAGE_CATEGORIES)
exports.updateCategory = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const { name, description, isActive } = req.body;

    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'categories');
      category.image = result.secure_url;
    }

    await category.save();

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private (Admin: MANAGE_CATEGORIES)
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Check if there are products using this category
    const Product = require('../models/Product');
    const productsCount = await Product.countDocuments({ category: category._id });
    if (productsCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot delete. ${productsCount} products are associated with this category.` 
      });
    }

    category.isActive = false;
    await category.save();
    res.status(200).json({ success: true, message: 'Category soft-deleted successfully', data: {} });
  } catch (error) {
    next(error);
  }
};
