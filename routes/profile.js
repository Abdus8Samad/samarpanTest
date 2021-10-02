const User = require('../models/user');

const mongoose = require('mongoose'),
app = require('express').Router();

app.post('/addfriend', (req, res) =>{
    if(req.user === "" || req.user === undefined || req.user === null){
        res.json({ status : 401, msg : "Please Login First !" });
    } else {
        const { username } = req.body;
        User.findOne({ username })
        .then(friend =>{
            User.findOne({username : req.user.username})
            .then(async (user) =>{
                user.friends.find((id) => {
                    if(id === friend._id){
                        res.json({ status : 409, msg : "Already a friend" });
                        return;
                    }
                })
                user.friends.push(friend._id);
                await user.save();
                res.json({ status : 200, msg : "Friend added" });
            })
            .catch(err =>{
                console.log(err);
                res.json({ status : 502, err});
            })
        })
        .catch(err =>{
            console.log(err);
            res.json({ status : 404, err});
        })
    }
})

app.post('/removefriend', (req, res) =>{
    if(req.user === "" || req.user === undefined || req.user === null){
        res.json({ status : 401, msg : "Please Login First !" });
    } else {
        const { username } = req.body;
        User.findOne({ username })
        .then(friend =>{
            User.findOne({username : req.user.username})
            .then(async (user) =>{
                let isFriend = false;
                console.log(user.friends[0].equals(friend._id))
                user.friends.find((id) => {
                    if(id.equals(friend._id)){
                        isFriend = true;
                    }
                })
                if(!isFriend){
                    console.log("Already a friend");
                    res.json({ status : 402, msg: "Already not a friend" });
                    return;
                }
                user.friends.pull(friend._id);
                await user.save();
                res.json({ status : 200, msg : "Friend removed" });
            })
            .catch(err =>{
                console.log(err);
                res.json({ status : 502, err});
            })
        })
        .catch(err =>{
            console.log(err);
            res.json({ status : 404, err});
        })
    }
})

module.exports = app;