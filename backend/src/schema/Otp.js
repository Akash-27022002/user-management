const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otp: {
        type: String,
        trim: true
    },
    purpose: {
        type: String,
        enum: ['VERIFICATION', 'FORGOT_PASSWORD', 'DELETE_ACCOUNT']
    },
    isValid: {
        type: Boolean,
    }
}, { timestamps: true });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;

