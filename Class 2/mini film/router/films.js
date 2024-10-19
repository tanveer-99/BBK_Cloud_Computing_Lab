const express = require('express');
const Film = require('../models/Films');

const router = express.Router();

router.get('/', async (req, res)=> {
    try {
        const films = await Film.find();
        res.send(films);
    } catch (error) {
        res.send({message: error});
    }
})


module.exports = router;