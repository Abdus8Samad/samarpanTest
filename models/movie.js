const mongoose = require('mongoose'),
Schema = mongoose.Schema,
model = mongoose.model;

const movieSchema = new Schema({
    title:String,
    longTitle:String,
    poster:String,
    wall:String,
    criticScore:Number,
    details:String,
    averageRating:Number,
    type:String,
    wiki:String,
    trailer:String,
    releasedOn:String,
    releasedIn:String,
    storyline:String,
    runtime:String,
    origin:String,
    writer:{
        name:String,
        avatar:String
    },
    director:{
        name:String,
        img:String
    },
    seasons:[Number],
    genres:[String],
    ratedBy:{
        users:[{
            type:Schema.Types.ObjectId,
            ref:'user'
        }],
        critics:[{
            type:Schema.Types.ObjectId,
            ref:'user'
        }]
    },
    cast:[{
        name:String,
        role:String,
        profilePic:String,
        wiki:String
    }],
    reviews:[{
        author:String,
        body:String,
        avatar:String,
        date:{ type:Date, default:Date.now }
    }]
})

const Movie = model('movie', movieSchema);

module.exports = Movie;