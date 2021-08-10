const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    //starts at the directory of this file, then navigates each value passed after it
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;