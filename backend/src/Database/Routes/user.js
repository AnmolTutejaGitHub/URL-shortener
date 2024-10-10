const express = require('express');
const router = new express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const auth = require('../MiddleWare/auth');

const secret_key = 'tobechanged';

router.get('/users', async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});


router.post('/login', auth, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid login credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid login credentials");

        const token = jwt.sign({ id: user._id, email: user.email }, secret_key, { expiresIn: '5d' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
})

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = jwt.sign(user, secret_key, { expiresIn: '5d' });
        res.cookie('token', token, { httpOnly: true, expiresIn: '5d' });

        res.status(200).send({ message: "Signup successful" });
    } catch (error) {
        res.status(500).send({ error: "Failed to create user" });
    }
})

module.exports = router;