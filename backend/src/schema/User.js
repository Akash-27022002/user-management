const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters'],
    },
    company: {
        type: String,
        required: [true, 'company is Required'],
        trim: true
    },
    // age: {
    //     type: Number,
    //     min: [18, 'Age must be at least 18'],
    //     required: [true, 'Age is Required'],
    // },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value) {
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                return age >= 18;
            },
            message: 'User must be at least 18 years old'
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image: {
        type: Buffer,
        required: [true, 'Image is required']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
