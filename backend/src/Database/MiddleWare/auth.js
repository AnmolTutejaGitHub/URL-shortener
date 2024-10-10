const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).send("Token missing or expired");
    }
    try {
        const isValid = jwt.verify(token, secret_key);
        if (isValid) req.user = jwt.decode(token, secret_key);
        next();
    } catch (error) {
        return res.status(400).send("Token expired or invalid");
    }
}
module.exports = auth;