const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    //starts at the directory of this file, then navigates each value passed after it
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;