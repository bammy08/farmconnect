const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: 'admin',
  },
});

module.exports = model('admins', adminSchema);
