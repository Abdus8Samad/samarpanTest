const mongoose = require('mongoose'),
Schema = mongoose.Schema,
model = mongoose.model,
passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:String,
    joinedAt: Date,
    email:{ type : String, default : ""},
    isAdmin:{ type : Boolean, default : false },
    isCritic:{ type : Boolean, default : false },
    score:{ type : Number, default: 10},
    avatar:{
        type:String,
        default:"https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png"
    },
    moviesRated:[{
        movie:String,
        rating:Number
    }],
    popularity:{ type: String, default: "1%" },
    friends:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    ratedMovies:[{
        type:Schema.Types.ObjectId,
        ref: 'movie'
    }],
    reviewedMovies:[{
        type:Schema.Types.ObjectId,
        ref:'movie'
    }]
})

userSchema.plugin(passportLocalMongoose);
const User = model('user', userSchema);

module.exports = User;