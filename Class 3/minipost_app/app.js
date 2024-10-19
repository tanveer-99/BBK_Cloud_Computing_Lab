const express = require('express');
const mongoose = require('mongoose');

const postsRouter = require('./routes/posts');


const app = express();

require('dotenv/config');

// receiving the JSON, without the body parser package
app.use(express.urlencoded({extended: true}));
app.use(express.json())


// routes
app.use('/posts', postsRouter);


// connection to mongodb
try {
    mongoose.connect(process.env.DB_CONNECTOR)
    .then(()=> {
        console.log("connected to the database")
    })

} catch (error) {
    console.log(error)
}








app.get('/', (req, res)=> {
    res.send("Connected")
})


app.listen('3000', ()=> {
    console.log("listening to port 3000")
})