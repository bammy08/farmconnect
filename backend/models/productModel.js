const { Schema, model } = require('mongoose');

const priceSchema = new Schema({
  range: {
    type: String,
    enum: ['1-10', '10-100', '100-500', 'per kg', 'per basket'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    shopName: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    prices: [priceSchema],
  },
  { timestamps: true }
);

productSchema.index(
  {
    name: 'text',
    category: 'text',
    location: 'text',
    description: 'text',
  },
  { weights: { name: '5', category: '4', location: '3', description: '2' } }
);

module.exports = model('Products', productSchema);
