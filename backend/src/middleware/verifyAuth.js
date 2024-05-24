const jwt = require("jsonwebtoken");
const { setCookies, TOKEN_CONSTANTS } = require("../utils");
class Middleware {
    decodeToken = async (req, res, next) => {
        try {
            const token = req?.cookies?.bearer ? req?.cookies?.bearer : req.headers?.authorization?.split("Bearer ")[1];
            if (!token) {
                throw new Error("Unautenticated , You must use a valid Bearer token");
            }
            const decodeValue = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decodeValue) {
                req.self = decodeValue;
                next();
            }
        } catch (error) {
            if (error.message.includes("Token used too late")) {
                return res.status(401).json({ error: error.message })
            }
            if (error.message == "Unautenticated , You must use a valid Bearer token") {
                return res.status(400).json({ error: error.message });
            }
            if (error.message == "jwt expired") {
                return this.handelTokenExpiration(req, res, next);
            }
            return res.status(500).json({ error: error.message });
        }
    }


    handelTokenExpiration = async (req, res, next) => {
        const refresh_token = req?.cookies?.rfToken;
        if (!refresh_token) {
            return res.status(400).json({ error: "Refresh token not found" })
        }
        const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_KEY);
        console.log(decoded);
        delete decoded.exp;
        const access_token = jwt.sign(decoded, process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_TOKEN_EXPIRY_TIME });

        req.self = decoded;
        setCookies(res, TOKEN_CONSTANTS.REFRESH_TOKEN, refresh_token, process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME, true, true);
        setCookies(res, TOKEN_CONSTANTS.ACCESS_TOKEN, access_token, process.env.JWT_TOKEN_EXPIRY_TIME, true, true);

        return next();
    };

}

module.exports = new Middleware();