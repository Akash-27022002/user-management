const { DOMAIN } = process.env

const setCookies = (res, key, value, maxAge = 36000, httpOnly = true, secure = true) => {
    let options = {
        httpOnly: httpOnly,
        sameSite: "None",
        secure: secure
    }
    if (maxAge) {
        options.maxAge = maxAge
    }
    if (process.env.NODE_ENV == "local") {
        // console.log(key)
    } else {
        console.log(DOMAIN);
        // options.httpOnly = false
        options.domain = DOMAIN
    }
    res.cookie(key, value, options);
}

module.exports = {
    setCookies
}