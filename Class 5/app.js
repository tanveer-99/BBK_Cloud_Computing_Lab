import express from 'express'

const app = express()

app.get('/', (req,res)=>{
    res.send('I just shipped my app to a container!')
})

app.listen(3000)