const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantID: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    liked: { type: Boolean, required: true },
    date: { type: Date, default: Date.now, required: true },
    isVisited: { type: Boolean, default: false, required: true },
});

historySchema.index({ userID: 1 });
historySchema.index({ restaurantID: 1 });

module.exports = mongoose.model('history', historySchema);