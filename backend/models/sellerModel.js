const { Schema, model } = require('mongoose');

const SellerSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      default: 'seller',
    },

    status: {
      type: String,
      default: 'pending',
    },
    payment: {
      type: String,
      default: 'inactive',
    },
    method: {
      type: String,
      required: true,
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = model('sellers', SellerSchema);
