const mongoose = require('mongoose'),
Schema = mongoose.Schema,
model = mongoose.model;

const movieSchema = new Schema({
    title:String,
    longTitle:String,
    Director:String,
    Writer:String,
    poster:String,
    wall:String,
    criticScore:Number,
    details:String,
    averageRating:Number,
    type:String,
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
        profilePic:String
    }],
    reviews:[{
        author:String,
        body:String,
        title:String,
        date:{ type:Date, default:Date.now }
    }]
})

const Movie = model('movie', movieSchema);

module.exports = Movie;