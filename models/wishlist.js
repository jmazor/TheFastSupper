const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishListSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    isRated: { type: Boolean, required: true },
    date: { type: Date, default: Date.now, required: true },
    visited: { type: Boolean, required: true },
});

wishListSchema.index({ userID: 1 });
wishListSchema.index({ restaurantID: 1 });

module.exports = mongoose.model('WishList', wishListSchema);