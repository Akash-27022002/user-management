const { Users } = require('../model');
const User = require('../schema/User');
const { deleteOtp } = require('./Otp');
const bcrypt = require("bcrypt");


const fetchUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
        if (!user) return null;
        return new Users(user);
    } catch (error) {
        throw error;
    }
}
/**
 * 
 * @param {String} id 
 * @returns {Promise<Users | null>}
 */
const fetchUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) return null;
        return new Users(user);
    } catch (error) {
        throw error;
    }
}

const isEmailExists = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user !== null;
    } catch (error) {
        throw error;
    }
};

const isUserVerified = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user.isVerified;
    } catch (error) {
        throw error;
    }
}

const createUsers = async (userData) => {
    try {
        const newUser = await Users.NewUser(userData);
        console.log(newUser);
        if (!newUser) null;
        const user = new User(newUser);
        await user.save();
        return new Users(user).data;
    } catch (error) {
        throw error;
    }
};

/**
 * 
 * @param {String} id 
 * @param {Object} userData 
 * @param {String} userData.name
 * @param {Number} userData.dob
 * @param {String} userData.company
 * @returns 
 */
const updateUserById = async (id, userData) => {
    try {
        const { name, company, dob } = userData;
        if (!name || !company || !dob) return null;
        const user = await User.findByIdAndUpdate(id, userData);
        return new Users(user).data;
    } catch (error) {
        throw error;
    }
}


const updateUserProfileById = async (id, image) => {
    try {
        if (!image) return null;
        const user = await User.findByIdAndUpdate(id, { image });
        return new Users(user).data;
    } catch (error) {
        throw error;
    }
}


/**
 * 
 * @param {User} user 
 * @param {String} password 
 * @returns {Promise<Users | null>}
 */
const updatePassword = async (user, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await user.updateOne({ password: hashedPassword });
        if (!result) return null;
        return new Users(result);
    } catch (error) {
        throw error;
    }
}

const updatePasswordById = async (id, newpassword, oldPassword) => {
    try {
        const user = await User.findById(id);
        if (!user) return null;
        const isValid = await new Users(user).matchPassword(oldPassword);
        if (!isValid) return null;
        const result = await updatePassword(user, newpassword);
        if (!result) return null;
        return new Users(result);
    } catch (error) {
        throw error;
    }
}


const forgotPasswordByUser = async (id, password) => {
    try {
        const user = await User.findById(id);
        if (!user) return null;
        const result = await updatePassword(user, password);
        if (!result) return null;
        return new Users(result);
    } catch (error) {

    }
}

const deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return null;
        const otp = await deleteOtp(id);
        return "Success";
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createUsers,
    isEmailExists,
    fetchUserById,
    isUserVerified,
    fetchUserByEmail,
    updateUserById,
    deleteUser,
    updatePasswordById,
    forgotPasswordByUser,
    updateUserProfileById
};