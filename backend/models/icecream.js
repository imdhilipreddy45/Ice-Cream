const mongoose = require('mongoose');

const IceCreamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('IceCream', IceCreamSchema);
