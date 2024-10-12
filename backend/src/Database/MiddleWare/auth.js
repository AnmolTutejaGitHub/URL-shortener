const jwt = require('jsonwebtoken');
const secret_key = 'tobechanged';
const User = require('../Models/User');

const auth = async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).send("Token missing or expired");
    }
    try {
        const decoded = jwt.verify(token, secret_key);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(400).send("Token expired or invalid");
        }
        req.user = user;

        next();
    } catch (error) {
        return res.status(400).send("Token expired or invalid");
    }
}
module.exports = auth;