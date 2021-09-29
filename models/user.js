const mongoose = require('mongoose'),
Schema = mongoose.Schema,
model = mongoose.model,
passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:String,
    email:String,
    isAdmin:Boolean,
    isCritic:Boolean,
    level:Number,
    avatar:{ type:String, default:"https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png" },
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