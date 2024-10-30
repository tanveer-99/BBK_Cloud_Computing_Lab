import mongoose, { Schema } from 'mongoose'

const FilmSchema = Schema({
    film_name:{
        type:String
    },
    film_type:{
        type:String
    },
    film_year:{
        type:String
    },
    film_link:{
        type:String
    }
})

const Films = mongoose.model('Film', FilmSchema)

export default Films