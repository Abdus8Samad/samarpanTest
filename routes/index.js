const app = require('express').Router(),
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

module.exports = app;