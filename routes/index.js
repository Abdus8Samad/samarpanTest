const app = require('express').Router(),
Movie = require('../models/movie');

app.get('/getMovie/:name', (req, res) =>{
    const { name } = req.params;
    Movie.findOne({ name })
    .then(movie =>{
        if(movie === NULL){
            res.json({ status: 404 });
        }
        res.json({ status: 200, movie });
    })
    .catch(err =>{
        res.json({ status: 500, err });
    })
})

module.exports = app;