const express = require('express');

const router = express.Router();

router.get('/', (req, res)=> {
    res.send('you are in movies!');
})

router.get('/hobbit', (req, res)=> {
    res.send("you are in the hobbit movie!");
})

module.exports = router;