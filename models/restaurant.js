const { mongoose, Schema } = require('./modules.js');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    foodType: [{ type: String, required: true }],
    price: { type: Number, default: null },
    rating: { type: Number, default: null },
    hours: { type: String, default: null },
    pictures: [{ type: String, default: null }],
    phone: { type: String, default: null },
});
restaurantSchema.index({ location: 1 });
restaurantSchema.index({ foodType: 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);