const express = require('express');

const mongoose = require('mongoose');

require('dotenv/config');

const app = express();


const url = process.env.DB_CONNECTOR;

mongoose.connect(url)
.then(() => { 
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

const movieRoute = require('./router/movies');
const userRoute = require('./router/users');
const filmRoute = require('./router/films');

app.use('/movies', movieRoute);
app.use('/users', userRoute);
app.use('/films', filmRoute);


const port = 3000;

app.get('/', (req,res) => {
    res.send("You are in your home page!");
})



app.listen(port, ()=> {
    console.log('server is running!');
})