const { createAccount, login, validateOtp, logout, forgotPassword } = require("./Auth");
const { getUser, updateUser, deleteAccount, updatePassword, updateUserProfile } = require("./User");

module.exports = {
    createAccount, getUser, login, validateOtp,
    logout, forgotPassword, updateUser, deleteAccount, updatePassword, updateUserProfile
}