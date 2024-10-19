const express = require('express');

const mongoose = require('mongoose');

const app = express();


const url = "mongodb+srv://tanvir:tanvir@cluster0.7xdebar.mongodb.net/cloud_computing_lab?retryWrites=true&w=majority&appName=Cluster0";

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