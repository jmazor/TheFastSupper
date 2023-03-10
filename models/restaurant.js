const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    alias: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image_url: String,
    url: String,
    review_count: Number,
    categories: [{
      alias: String,
      title: String
    }],
    rating: Number,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    transactions: [String],
    price: String,
    location: {
      address1: String,
      address2: String,
      address3: String,
      city: String,
      zip_code: String,
      country: String,
      state: String,
      display_address: [String]
    },
    phone: String,
    display_phone: String,
  });
  
module.exports = mongoose.model('Restaurant', restaurantSchema);