const app = require('express').Router(),
Movie = require('../models/movie');

app.post('/:name/rate',(req,res) => {
    const { rate } = req.body, { name } = req.params, user = req.user;
    Movie.findOne({ title : name})
    .then(async (movie) => {
        if(!movie){
            res.json({ status : 404 });
        }
        else {
            const rateobj = {
                rating: rate,
                user: user._id
            };
            if(user.isCritic){
                movie.ratedBy.critics.push(rateobj);
            }
            else{
                movie.ratedBy.users.push(rateobj);
            }
            await movie.save();
            res.json({ status : 200, movie });
        }
    })
    .catch(err => {
        console.log(err);
        res.json({ status : 500, err });
    })
    
})

module.exports = app;