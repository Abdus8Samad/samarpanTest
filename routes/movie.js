const app = require('express').Router();
Movie = require('../models/movie');

app.get('/getMovie/:name', (req, res) =>{
    const { name } = req.params;
    Movie.findOne({ title: name })
    .then(movie =>{
        if(!movie){
            res.json({ status: 404 });
        } else {
            res.json({ status: 200, movie });
        }
    })
    .catch(err =>{
        console.log(err);
        res.json({ status: 500, err });
    })
})

app.post('/:name/rate',(req,res) => {
    const { rate } = req.body, { name } = req.params, user = req.user;
    console.log(req.body);
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
                let Dumid = movie.ratedBy.critics.find(rating => rating.user === user._id);
                if(Dumid === undefined){
                    movie.ratedBy.critics.push(rateobj);
                }
                else{
                    const index = movie.ratedBy.critics.indexexOf(Dumid);
                    movie.ratedBy.critics[index].rating = rateobj.rating;
                }
            }
            else{
                let Dumid = movie.ratedBy.users.find(rating => rating.user === user._id);
                console.log(Dumid);
                if(Dumid === undefined){
                    movie.ratedBy.users.push(rateobj);
                }
                else{
                    const index = movie.ratedBy.users.indexOf(Dumid);
                    movie.ratedBy.users[index].rating = rateobj.rating;
                }
            }
            await movie.save();
            res.json({ status : 200, movie });
        }
    })
    .catch(err => {
        console.log(err);
        res.json({ status : 502, err });
    })
    
})

app.post('/:name/review', (req, res) =>{
    const { review } = req.body, { name } = req.params, user = req.user;
    console.log(review);
    Movie.findOne({ title: name })
    .then(async (movie) =>{
        if(!movie){
            console.log("Movie Not Found !");
            res.json({ status: 400, msg:" Movie Not Found" });
        } else {
            const newReview = {
                author: user.username,
                body: review,
                avatar: user.avatar,
                date:Date.now()
            };
            console.log(newReview.body);
            let reviewed = movie.reviews.find(review => review.author === user.username);
            if(reviewed === undefined){
                movie.reviews.push(newReview);
            } else {
                const index = movie.reviews.indexOf(reviewed);
                movie.reviews[index].body = review;
            }
            await movie.save();
            console.log(movie.reviews);
            res.json({ status: 200, msg:"Reviewed Successfully" });
        }
    })
    .catch(err =>{
        console.log(err);
        res.json({ status: 502, err })
    })
})

module.exports = app;