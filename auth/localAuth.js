const User = require('../models/user'),
passport = require('passport'),
LocalStrategy = require('passport-local');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));