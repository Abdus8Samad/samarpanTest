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
    type:String,
    wiki:String,
    trailer:String,
    releasedOn:String,
    releasedIn:String,
    storyline:String,
    runtime:String,
    origin:String,
    averageRating:{
        type: Number,
        default:() => {
            const rating = 0,
            users = this.ratedBy.users,
            critics = this.ratedBy.critics,
            totalUsers = users.length + critics.length;
            users.forEach((user) =>{
                rating += user.rating;
            })
            critics.forEach((user) =>{
                rating += user.rating;
            })
            return (rating / totalUsers).toPrecision(2);
        }
    },
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
            rating:Number,
            user:{
                type:Schema.Types.ObjectId,
                ref:'user'    
            }
        }],
        critics:[{
            rating:Number,
            user:{
                type:Schema.Types.ObjectId,
                ref:'user'    
            }
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