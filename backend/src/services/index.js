const { sendOtp, verifyOtp, deleteOtp } = require("./Otp");
const { createUsers, isEmailExists, isUserVerified, fetchUserByEmail, fetchUserById, deleteUser, updatePasswordById, forgotPasswordByUser, updateUserById, updateUserProfileById } = require("./User");

module.exports = {
    createUsers, isEmailExists, isUserVerified, fetchUserByEmail, fetchUserById,
    sendOtp, verifyOtp, deleteUser, deleteOtp, updatePasswordById, forgotPasswordByUser, updateUserById, updateUserProfileById
}