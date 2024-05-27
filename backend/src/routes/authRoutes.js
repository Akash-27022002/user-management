const { Router } = require("express");
const { createAccount, login, validateOtp, logout, forgotPassword, setNewPassword } = require("../controllers");
const { upload } = require("../utils");
const middleware = require("../middleware/verifyAuth");
const authRouter = Router();

authRouter.route("/account")
    .post(upload.single("image"), createAccount);

authRouter.route('/login')
    .post(login);

authRouter.route('/forgotPassword')
    .post(forgotPassword)
    .patch(setNewPassword);

authRouter.route('/otp')
    .post(validateOtp);

authRouter.use(middleware.decodeToken);
authRouter.route('/logout')
    .post(logout);

module.exports = authRouter;
