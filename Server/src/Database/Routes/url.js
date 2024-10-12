const express = require('express');
const router = new express.Router();
const URLs = require('../Models/Urls');


router.post('/url', async (req, res) => {
    const originalurl = req.body.originalurl;

    try {
        const inDB = await URLs.findOne({ originalurl });
        if (inDB) {
            return res.status(200).send(inDB);
        }
        res.status(200).send({ message: 'URL not found', shortened: null });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error fetching URL', error: error.message });
    }
});


router.post('/addurl', async (req, res) => {

    try {
        const url = new URLs(req.body);
        await url.save();
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

router.get('/r/:Dummyid', async (req, res) => {
    const Dummyid = req.params.Dummyid;

    try {
        const urlObj = await URLs.findOne({ Dummyid });
        if (urlObj) {
            return res.redirect(urlObj.originalurl);
        } else {
            res.status(404).send("URL not found");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;