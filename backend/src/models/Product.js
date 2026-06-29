const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  images: [{ type: String }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
  tags: [String],
  sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'] }],
  colors: [{ type: String }],
  variants: [{
    sku: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, default: 0, min: 0 },
    priceOverride: { type: Number } // If specific size/color costs more
  }],
  material: { type: String, default: 'Cotton' },
  totalStock: { type: Number, default: 0, min: 0 },
  sku: { type: String },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  onSale: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Auto-generate slug from name if not provided
productSchema.pre('validate', async function(next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    let baseSlug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    this.slug = baseSlug;
    
    // Check for uniqueness
    let exists = await mongoose.model('Product').findOne({ slug: this.slug });
    let counter = 1;
    while (exists && exists._id.toString() !== this._id.toString()) {
      this.slug = `${baseSlug}-${counter}`;
      exists = await mongoose.model('Product').findOne({ slug: this.slug });
      counter++;
    }
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
