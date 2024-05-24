const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Buffer } = require("buffer")


class Users {
    _id;
    email;
    name;
    isVerified;
    #password;
    company;
    dob;
    image;
    createdAt;
    updatedAt;


    constructor(params) {
        this._id = params._id;
        this.email = params.email;
        this.#password = params.password;
        this.name = params.name;
        this.isVerified = params.isVerified;
        this.company = params.company;
        this.dob = params.dob;
        this.image = Buffer.from(params.image.data).toString('base64');
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }

    get data() {
        return {
            name: this.name,
            email: this.email,
            _id: this._id,
            isVerified: this.isVerified,
            dob: this.dob,
            image: this.image,
            company: this.company

        };
    }

    /**
     * Creates a firestore compatible object with current time for createdAt
     * and updatedAt using Firebase Timestamp
     *
     * @param {Object} userData
     * @param {string} userData.email
     * @param {string} userData.name
     * @param {string} userData.password
     * @param {string} userData.dob
     * @param {String} userData.image
     **/

    static async NewUser(userData) {
        try {
            const { email, name, company, dob, image, password } = userData;
            console.log({ userData });
            if (!name || !password || !company || !dob || !image || !email) {
                return null;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            return {
                email,
                name,
                password: hashedPassword,
                isVerified: false,
                company,
                dob,
                image,
            };
        } catch (err) {
            throw err;
        }
    }

    async matchPassword(password) {
        const match = await bcrypt.compare(password, this.#password);
        return !!match;
    }

    /**
     * Signs and returns jwt token with user data
     * @returns {Object} tokens
     **/
    generateJWT(tokenTime = "1d") {
        const data = this.data
        delete data.image
        return {
            accessToken: jwt.sign({ data }, process.env.JWT_SECRET_KEY, { expiresIn: tokenTime }),
            refreshToken: jwt.sign({ data }, process.env.JWT_REFRESH_TOKEN_KEY, { expiresIn: "7d" })
        };
    }

}

module.exports = Users;