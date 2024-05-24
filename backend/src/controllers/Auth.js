const { fetchUserByEmail, isEmailExists, createUsers, fetchUserById, verifyOtp, sendOtp, forgotPasswordByUser } = require("../services");
const { setCookies, TOKEN_CONSTANTS } = require("../utils");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Invalid Email and Password");
        }
        const user = await fetchUserByEmail(email);
        if (!user) throw new Error("Invalid Email and Password");
        const matchPassword = await user.matchPassword(password);
        if (!matchPassword) throw new Error("Invalid Email and Password");
        return res.redirect(`/verification/${user._id}/?email=${email}`);
    } catch (error) {
        if (error.message == "Invalid Email and Password") {
            return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: error.message })
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const createAccount = async (req, res) => {
    try {
        const { name, email, password, company, age, dob } = req.body;
        const file = req.file;
        const user = await isEmailExists(email);
        if (user) throw new Error("User Already Exits");
        const newUser = await createUsers({ name, email, password, company, age, dob: new Date(), image: file.buffer });
        if (!newUser) throw new Error("UnExpected Error While Creating the User");
        console.log("sending OTP");
        await sendOtp(email, newUser._id)
        return res.status(201).json({ _id, email });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        const user = await fetchUserByEmail(email);
        if (!user) return res.status(400).json({ error: "Invalid Uer" });
        const result = await verifyOtp(otp, id);
        if (!result) return res.status(400).json({ error: "Invalid OTP" });
        const fp = await forgotPasswordByUser(user._id, password);
        if (!fp) return res.status(400).json({ error: "UnExpected Error while Updating the User" });
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const logout = async (req, res) => {
    try {
        res.clearCookie(TOKEN_CONSTANTS.ACCESS_TOKEN);
        res.clearCookie(TOKEN_CONSTANTS.REFRESH_TOKEN);
        res.status(200).json({});
        // setCookies(res, TOKEN_CONSTANTS.ACCESS_TOKEN, "", 100 , false, true);
        // setCookies(res, TOKEN_CONSTANTS.REFRESH_TOKEN, "", 100, false, true);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const validateOtp = async (req, res) => {
    try {
        // const { id } = req.params;
        const { email, otp } = req.body;
        const user = await fetchUserByEmail(email);
        if (!user) return res.status(400).json({ error: "Invalid Uer" });
        const result = await verifyOtp(otp, id);
        if (!result) return res.status(400).json({ error: "Invalid OTP" });
        console.log("result", result);
        const { accessToken, refreshToken } = user.generateJWT();
        setCookies(res, TOKEN_CONSTANTS.ACCESS_TOKEN, accessToken, process.env.JWT_TOKEN_EXPIRY_TIME, false, true);
        setCookies(res, TOKEN_CONSTANTS.REFRESH_TOKEN, refreshToken, process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME, false, true);
        return res.status(200).json({ message: "Success" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    login,
    logout,
    createAccount,
    validateOtp,
    forgotPassword
}