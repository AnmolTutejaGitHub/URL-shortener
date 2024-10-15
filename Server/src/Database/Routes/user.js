require('dotenv').config();
const express = require('express');
const router = new express.Router();
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const auth = require('../MiddleWare/auth');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const secret_key = process.env.SECRET_KEY;

router.get('/users', auth, async (req, res) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: "Invalid login credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ error: "Invalid login credentials" });

        const token = jwt.sign({ _id: user._id }, secret_key, { expiresIn: '5d' });

        //console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'Lax',
            secure: false
        });

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = jwt.sign({ user_id: user._id }, secret_key, { expiresIn: '5d' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'Lax',
            secure: false
        });

        res.status(200).send({ message: "Signup successful" });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
})

router.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        const urlObj = {
            originalurl: req.body.originalurl,
            name: req.body.name,
            shortened: req.body.shortened,
            Dummyid: req.body.Dummyid
        }

        user.urls.push(urlObj);
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})


router.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.status(200).send('Logged out and token destroyed');
});


router.post('/delUserUrl', async (req, res) => {
    const { email, originalurl } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        user.urls = user.urls.filter(url => url.originalurl !== originalurl);
        await user.save();

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.post('/otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.NODEMAIL_APP_PASSWORD,
            },
        });

        let mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: email,
            subject: 'Your login OTP',
            text: `Your OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).send(error);
            }
            res.status(200).send(otp);
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;