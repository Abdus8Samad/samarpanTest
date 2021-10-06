const mongoose = require('mongoose'),
Schema = mongoose.Schema,
model = mongoose.model;

const movieSchema = new Schema({
    name:String,
    duration:Number,
    Director:String,
    Writer:String,
    criticScore:Number,
    details:String,
    averageRating:Number,
    type:String,
    seasons:[Number],
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
    userRating:{ type: Number, default: 0},
    genres:[String],
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