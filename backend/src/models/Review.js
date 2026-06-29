const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Prevent user from submitting more than one review per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function(productId) {
  const obj = await this.aggregate([
    { $match: { product: productId, isActive: true } },
    { $group: { _id: '$product', averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
  ]);

  try {
    const Product = mongoose.model('Product');
    if (obj[0]) {
      await Product.findByIdAndUpdate(productId, {
        averageRating: Math.round(obj[0].averageRating * 10) / 10,
        totalReviews: obj[0].totalReviews
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        averageRating: 0,
        totalReviews: 0
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.product);
});

module.exports = mongoose.model('Review', reviewSchema);
