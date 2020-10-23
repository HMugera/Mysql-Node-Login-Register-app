const express  = require('express');
const path = require('path');
const router = express.Router();


router.get('/', function(req, res) {
     res.sendFile(path.join(__dirname + '/views/index.html'));
});
router.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});


module.exports = router;