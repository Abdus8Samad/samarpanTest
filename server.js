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
app.use(morgan('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));
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

const demonSlayer = {
    title:"Demon Slayer: Mugen Train",
    longTitle:"Demon Slayer: Kimetsu no Yaiba",
    Director:"Haruo Sotozaki",
    Writer:"Koyoharu Gotouge",
    criticScore:96,
    averageRating:8.7,
    type:"Tv Series",
    seasons:[26, 1],
    details:"TV Series 2019–TV-MA 25min",
    ratedBy:{
        users:[],
        critics:[]
    },
    poster:"https://m.media-amazon.com/images/M/MV5BN2EwNTUwYWItZTY4ZC00N2Q1LWFhZWQtNjMwMDBkZDVmYThjXkEyXkFqcGdeQXVyOTA2OTk0MDg@._V1_.jpg",
    wall:"https://i.pinimg.com/originals/96/d1/30/96d1309afdea29151ed8ff027d092eff.jpg",
    genres:["Animation", "Action", "Adventure"],
    cast:[{
        name:"Natsuki Hanae",
        role:"Tanjiro Kamado",
        profilePic:"https://m.media-amazon.com/images/M/MV5BNDYxNGM5MDktMGRjOC00ZTRlLTllNDgtMDkyMTUzZWQ4Y2U3XkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UX214_CR0,0,214,317_AL__QL50.jpg"
    }],
    reviews:[
        {
            author:"Abdus Samad",
            title:"Kimetsu No Yaiba",
            body: "Awesome literally awesome. I have seen alot of anime shows but this was one of the best and people attacking this show have a personal grudge to be honest as it broke some records and the fact that its fans are not attacking the critics is a proof on all its own that how toxic they are .... Characters-9 Animation-10 Voice acting-9 Plot-8 Fighting-10 Music-9"
        },
        {
            author:"Mr_Raht",
            title:"I have no words to explain why this is the best anime I've ever seen",
            body:"I have seen a lot of action fantasy anime shows, but for some reason, this is the best. I was so into it that I can't pick one just thing as my favorite about this show. The action, the character development, the emotional moments, the score, the animation or be it just the writing in general, Demon Slayer is on a whole different level. I went through a number of emotions watching it, and it felt like I was on one wild ride from episode 1 to 26. The mood keeps varying from time to time, but the tempo never drops and with intriguing characters, it only gets better and better with every episode."
        },
    ]
}


const Movie = require('./models/movie');
// Movie.create(demonSlayer)
// .then(movie =>{
//     console.log(movie);
// })
// .catch(err => console.log(err));
//Routes
const authRoutes = require('./routes/auth'),
profileRoutes = require("./routes/profile"),
indexRoutes = require("./routes/index");

// Using the routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})