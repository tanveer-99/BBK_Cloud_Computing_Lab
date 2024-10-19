const express = require('express');

const router = express.Router();

router.get('/', (req, res)=> {
    res.send('You are in the users page!');
})

router.get('/tanvir', (req, res)=> {
    res.send("You are in tanvir's page!")
})

module.exports = router;