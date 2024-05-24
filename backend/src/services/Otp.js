const { Otps } = require("../model");
const { OTP } = require("../schema");
const { sendEmail } = require("../utils");

const sendOtp = async (email, userId) => {
    try {
        const newOtp = Otps.NewOtp({ userId });
        if (!newOtp) return null;
        const otp = await OTP.findOne({ userId });
        if (otp) {
            await otp.updateOne(newOtp)
        } else {
            await OTP.create(newOtp);
        }
        await sendEmail(email, "OTP Verification", `OTP : ${newOtp.otp}`);
        return "Success"
    } catch (error) {
        throw error;
    }
}

const verifyOtp = async (otp, userId) => {
    const result = await OTP.findOne({ userId });
    if (!result) return null;
    console.log(result);
    const match_result = new Otps(result).matchOtp(otp);
    if (!match_result) return null;
    await result.updateOne({ isValid: false });
    return true;
}

const deleteOtp = async (userId) => {
    try {
        const otp = await OTP.findOneAndDelete({ userId });
        if (!otp) return null;
        return "success";
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendOtp,
    verifyOtp,
    deleteOtp
}