
class Otps {
    _id;
    userId;
    otp;
    purpose;
    isValid;
    createdAt;
    updatedAt;


    constructor(params) {
        this._id = params._id;
        this.otp = params.otp;
        this.isValid = params.isValid;
        this.userId = params.userId;
        this.purpose = params.purpose;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }

    get data() {
        return {
            userId: this.userId,
            _id: this._id,
            updatedAt: this.updatedAt,
            otp: this.otp
        };
    }



    /**
     * Creates a firestore compatible object with current time for createdAt
     * and updatedAt using Firebase Timestamp
     *
     * @param {Object} otpData
     * @param {string} otpData.userId
     **/

    static NewOtp(otpData) {
        try {
            const { userId } = otpData;
            console.log({ otpData });
            if (!userId) {
                return null;
            }
            const generateOtp = () => {
                return (Math.floor(Math.random() * 9) + 1) +
                    String(Math.floor(Math.random() * 10)).padStart(1, '0') +
                    String(Math.floor(Math.random() * 10)).padStart(1, '0') +
                    String(Math.floor(Math.random() * 10)).padStart(1, '0') +
                    String(Math.floor(Math.random() * 10)).padStart(1, '0') +
                    String(Math.floor(Math.random() * 10)).padStart(1, '0');
            }
            return {
                userId,
                otp: "111111",//generateOtp(),
                purpose: "VERIFICATION",
                isValid: true
            };
        } catch (err) {
            throw err;
        }
    }

    matchOtp(otp) {
        return this.isValid && this.otp == otp && (new Date(this.updatedAt).getTime() / 1000) + 600 >= new Date().getTime() / 1000;
    }

    matchForgotOtp(otp) {
        return !this.isValid && this.otp == otp && (new Date(this.updatedAt).getTime() / 1000) + 600 >= new Date().getTime() / 1000;
    }


}

module.exports = Otps;