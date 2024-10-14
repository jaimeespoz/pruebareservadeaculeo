const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home.html');
});

router.get('/home', (req, res) => {
    res.render('home.html');
});

router.get('/otra', (req, res) => {
    res.render('otra.html');
});

module.exports = router;
