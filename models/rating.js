const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, default: null },
    favorite: { type: Boolean, required: true },
});

ratingSchema.index({ userID: 1 });
ratingSchema.index({ restaurantID: 1 });

module.exports = mongoose.model('Rating', ratingSchema);
