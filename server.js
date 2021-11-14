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
    longTitle:"Demon Slayer Kimetsu no Yaiba: Mugen Train",
    director:{
        name:"Haruo Sotozaki",
        img:"https://images.moviefit.me/p/o/220882-haruo-sotozaki.jpg"
    },
    releasedOn:"16 OCTOBER 2020",
    releasedIn:"Japan",
    origin:"Japan",
    Writer:"Koyoharu Gotouge",
    wiki:"https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba_–_The_Movie:_Mugen_Train",
    criticScore:96,
    trailer:"https://www.youtube.com/watch?v=ATJYac_dORw",
    averageRating:8.7,
    type:"Tv Series",
    seasons:[26, 1],
    details:"Anime Movie 2020 - 1h 57m",
    runtime:"1h 57m",
    storyline:"A boy raised by boars, who wears a boar's head, boards the Infinity Train on a new mission with the Flame Pillar along with another boy who reveals his true power when he sleeps. Their mission is to defeat a demon who has been tormenting people and killing the demon slayers who oppose it.",
    ratedBy:{
        users:[],
        critics:[]
    },
    poster:"https://m.media-amazon.com/images/M/MV5BN2EwNTUwYWItZTY4ZC00N2Q1LWFhZWQtNjMwMDBkZDVmYThjXkEyXkFqcGdeQXVyOTA2OTk0MDg@._V1_.jpg",
    wall:"https://i.pinimg.com/originals/96/d1/30/96d1309afdea29151ed8ff027d092eff.jpg",
    genres:["Animation", "Action", "Adventure"],
    cast:[
        {
            name:"Natsuki Hanae",
            role:"Tanjiro Kamado",
            profilePic:"https://m.media-amazon.com/images/M/MV5BNDYxNGM5MDktMGRjOC00ZTRlLTllNDgtMDkyMTUzZWQ4Y2U3XkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UX214_CR0,0,214,317_AL__QL50.jpg",
            wiki:"https://en.wikipedia.org/wiki/Natsuki_Hanae"

        },
        {
            name:"Yuki Kaji",
            role:"Sabito",
            profilePic:"https://upload.wikimedia.org/wikipedia/commons/b/b1/27th_Tokyo_International_Film_Festival_Y%C5%ABki_Kaji.jpg",
            wiki:"https://en.wikipedia.org/wiki/Yuki_Kaji"
        },
        {
            name:"Akari Kitō",
            role:"Nezuko kamado",
            profilePic:"https://image.tmdb.org/t/p/w600_and_h900_bestv2/7ixEYc40rGh6UIn8QqGlTwlALZc.jpg",
            wiki:"https://en.wikipedia.org/wiki/Akari_Kitō"
        },
        {
            name:"Hiro Shimono",
            role:"Zenitsu Agatsuma",
            profilePic:"https://m.media-amazon.com/images/M/MV5BZmU4YzZjNzMtMmM5Yy00YTQxLWI2ODQtMjlhODFlMzE5ODEzXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UY1200_CR85,0,630,1200_AL_.jpg",
            wiki:"https://en.wikipedia.org/wiki/Hiro_Shimono"
        },
        {
            name:"Yoshitsugu Matsuoka",
            role:"Hashibira Inosuke",
            profilePic:"https://www.thefamouspeople.com/profiles/images/yoshitsugu-matsuoka-1.jpg",
            wiki:"https://en.wikipedia.org/wiki/Yoshitsugu_Matsuoka"
        },
        {
            name:"Satoshi Hino",
            role:"Rengoku Kyôjurô",
            profilePic:"https://m.media-amazon.com/images/M/MV5BMmM0MjRkYjMtNzhiYS00YmNmLTlmMmYtMjlkOWE0NzQzNzYzXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_UY317_CR12,0,214,317_AL__QL50.jpg",
            wiki:"https://en.wikipedia.org/wiki/Satoshi_Hino"
        }
    ],
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
};


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