const { mongoose, Schema } = require('./modules.js');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    picture: { type: String, default: null },
});
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
