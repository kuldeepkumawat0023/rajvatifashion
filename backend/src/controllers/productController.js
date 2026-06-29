const Product = require('../models/Product');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc    Get all products with advanced filtering
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const { 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      sort, 
      page = 1, 
      limit = 12,
      isFeatured,
      isBestSeller,
      isNewArrival
    } = req.query;

    let query = { isActive: true };

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by Categories
    if (category) {
      query.categories = { $in: category.split(',') };
    }

    // Filter by Price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Boolean filters
    if (isFeatured === 'true') query.isFeatured = true;
    if (isBestSeller === 'true') query.isBestSeller = true;
    if (isNewArrival === 'true') query.isNewArrival = true;

    // Sorting
    let sortObj = { createdAt: -1 }; // default newest
    if (sort) {
      if (sort === 'price_asc') sortObj = { price: 1 };
      else if (sort === 'price_desc') sortObj = { price: -1 };
      else if (sort === 'rating') sortObj = { averageRating: -1 };
      else if (sort === 'oldest') sortObj = { createdAt: 1 };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('categories', 'name slug')
      .sort(sortObj)
      .skip(startIndex)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      },
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug or id
// @route   GET /api/v1/products/:identifier
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const identifier = req.params.identifier;
    let query = { isActive: true };
    
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = identifier;
    } else {
      query.slug = identifier;
    }

    const product = await Product.findOne(query).populate('categories', 'name slug');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private (Admin: MANAGE_PRODUCTS)
exports.createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // Convert comma-separated arrays back to arrays if sent via FormData
    if (typeof productData.categories === 'string') productData.categories = productData.categories.split(',').map(c => c.trim());
    if (typeof productData.tags === 'string') productData.tags = productData.tags.split(',').map(t => t.trim());
    if (typeof productData.sizes === 'string') productData.sizes = productData.sizes.split(',').map(s => s.trim());
    if (typeof productData.colors === 'string') productData.colors = productData.colors.split(',').map(c => c.trim());
    
    // Parse variants if sent as JSON string
    if (typeof productData.variants === 'string') {
      try { productData.variants = JSON.parse(productData.variants); } catch (e) { }
    }
    
    // Calculate totalStock based on variants
    if (productData.variants && Array.isArray(productData.variants)) {
      productData.totalStock = productData.variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
    } else {
      productData.totalStock = productData.stock || 0;
    }

    // Handle multiple image uploads
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, 'products');
        imageUrls.push(result.secure_url);
      }
    }
    productData.images = imageUrls;

    const product = await Product.create(productData);

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin: MANAGE_PRODUCTS)
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updateData = req.body;

    if (typeof updateData.categories === 'string') updateData.categories = updateData.categories.split(',').map(c => c.trim());
    if (typeof updateData.tags === 'string') updateData.tags = updateData.tags.split(',').map(t => t.trim());
    if (typeof updateData.sizes === 'string') updateData.sizes = updateData.sizes.split(',').map(s => s.trim());
    if (typeof updateData.colors === 'string') updateData.colors = updateData.colors.split(',').map(c => c.trim());

    if (typeof updateData.variants === 'string') {
      try { updateData.variants = JSON.parse(updateData.variants); } catch (e) { }
    }
    
    if (updateData.variants && Array.isArray(updateData.variants)) {
      updateData.totalStock = updateData.variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
    } else if (updateData.stock !== undefined) {
      updateData.totalStock = updateData.stock;
    }

    let imageUrls = product.images || [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, 'products');
        imageUrls.push(result.secure_url);
      }
    }
    updateData.images = imageUrls;

    Object.assign(product, updateData);
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin: MANAGE_PRODUCTS)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.isActive = false;
    await product.save();

    res.status(200).json({ success: true, message: 'Product soft-deleted successfully', data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a specific product image
// @route   DELETE /api/v1/products/:id/image
// @access  Private (Admin: MANAGE_PRODUCTS)
exports.deleteProductImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide imageUrl to delete' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.images = product.images.filter(img => img !== imageUrl);
    await product.save();

    res.status(200).json({ success: true, message: 'Image removed successfully', data: product });
  } catch (error) {
    next(error);
  }
};
