const app = require('express').Router(),
User = require('../models/user'),
passport = require('passport');

app.get("/getUser", (req, res) =>{
    res.send(req.user);
})

app.get("/getUser/:name", (req,res) =>{
    User.findOne({username : req.params.name})
    .then(user =>{
        if(user === null){
            res.json({ status : 404 });
        } else {
            res.json({ status : 200, user });
        }
    })
    .catch(err =>{
        res.json({ status : 404 , err});
        console.log(err);
    })
})

app.post('/register', (req, res) =>{
    const d = Date.now();
    const { username, password, avatar, email } = req.body;
    const newUser = {
        username,
        avatar,
        email,
        joinedAt : d
    }
    User.findOne({ username })
    .then(user =>{
        if(user){
            res.json({ status: 409, user , msg: "Username Already Exists"});
        } else {
            User.register(newUser, password)
            .then(user =>{
                console.log(user);
                passport.authenticate('local')(req, res, () =>{
                    res.json({ status: 200, msg: "", user });
                })
            })
            .catch(err =>{
                console.log(err);
                res.json({ status: 500, msg: err });
            })
        }
    })
    .catch(err =>{
        console.log(err);
        res.json({ status: 500, msg: err });
    })
})

app.post('/login', passport.authenticate('local'),(req, res) =>{
    res.json({user: req.user});
})


app.post('/logout', (req, res) =>{
    req.logOut();
    res.json({ status : 200 });
})

module.exports = app;