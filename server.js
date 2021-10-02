const express = require('express'),
app = express(),
path = require('path'),
mongoose = require('mongoose'),
connect = mongoose.connect,
morgan = require('morgan'),
cors = require('cors'),
expressSession = require('express-session'),
cookieParser = require('cookie-parser'),
localAuth = require('./auth/localauth'),
PORT = process.env.PORT || 8080,
passport = require('passport');
require('dotenv/config');
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to the db');
    })
    .catch((err) => {
        console.log('Some error occured while connecting to the db', err)
    })

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(expressSession({
    secret: 'My secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "strict",
        httpOnly: true
    }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('this is the server');
})

//Routes
const authRoutes = require('./routes/auth'),
profileRoutes = require("./routes/profile");

// Using the routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})