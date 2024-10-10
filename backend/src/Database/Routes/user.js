const express = require('express');
const router = new express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const auth = require('../MiddleWare/auth');
const bcrypt = require('bcrypt');

const secret_key = 'tobechanged';

router.get('/users', auth, async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/login', auth, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid login credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid login credentials");

        const token = jwt.sign(user.toObject(), secret_key, { expiresIn: '5d' });
        console.log(token);
        res.cookie('token', token, { httpOnly: true, maxAge: 5 * 24 * 60 * 60 * 1000 });

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        //console.log(req.body);
        await user.save();

        const token = jwt.sign(user.toObject(), secret_key, { expiresIn: '5d' });
        //console.log(token);

        res.cookie('token', token, { httpOnly: true, maxAge: 5 * 24 * 60 * 60 * 1000 });
        res.status(200).send({ message: "Signup successful" });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
})

module.exports = router;