import express from 'express'
const router = express.Router()
import Films from '../models/Films.js'

import verifyToken from './verifyToken.js'

router.get('/', verifyToken ,async(req, res)=> {
    try {
        const films = await Films.find()
        res.status(200).send(films)
    } catch (error) {
        res.status(404).send({message: error})
    }
})

export default router