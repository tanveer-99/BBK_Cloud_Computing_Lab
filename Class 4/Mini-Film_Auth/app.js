import { config } from 'dotenv'
import express, { urlencoded, json } from 'express'
import { connect } from 'mongoose'


import 'dotenv/config'

const app = express()

// JSON Parse
app.use(urlencoded({extended: true}));
app.use(json())


// Routes
import filmRoute from './routes/films.js'
import authRoute from './routes/auth.js'
app.use('/api/film', filmRoute)
app.use('/api/user', authRoute)



// connect mongoDB
connect(process.env.DB_CONNECTOR)
.then(()=> {
    console.log("connected to the DB")
})

app.listen(3000, ()=> {
    console.log("listening to port 3000")
})