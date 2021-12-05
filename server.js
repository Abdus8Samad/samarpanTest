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
    writer:{
        name: "Koyoharu Gotouge",
        avatar: "sdsdf"
    },
    wiki:"https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba_–_The_Movie:_Mugen_Train",
    criticScore:96,
    trailer:"https://www.youtube.com/watch?v=ATJYac_dORw",
    averageRating:8.7,
    type:"MOVIE",
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
            body: "Awesome literally awesome. I have seen alot of anime shows but this was one of the best and people attacking this show have a personal grudge to be honest as it broke some records and the fact that its fans are not attacking the critics is a proof on all its own that how toxic they are .... Characters-9 Animation-10 Voice acting-9 Plot-8 Fighting-10 Music-9",
            avatar:"https://st2.depositphotos.com/1715570/7764/i/600/depositphotos_77646168-stock-photo-happy-black-guy-sitting-with.jpg"
        },
        {
            author:"Mr_Raht",
            body:"I have seen a lot of action fantasy anime shows, but for some reason, this is the best. I was so into it that I can't pick one just thing as my favorite about this show. The action, the character development, the emotional moments, the score, the animation or be it just the writing in general, Demon Slayer is on a whole different level. I went through a number of emotions watching it, and it felt like I was on one wild ride from episode 1 to 26. The mood keeps varying from time to time, but the tempo never drops and with intriguing characters, it only gets better and better with every episode.",
            avatar:"https://i.kym-cdn.com/photos/images/newsfeed/002/116/541/747.jpg"
        },
        {
            author:"SSL-Elite",
            body:"Demon Slayer: Mugen Train is by far one the best anime movies to ever be released. I remember seeing this movie when it came out in theaters in April, and it was truly one of the best cinema-going experiences I’ve ever witnessed. It’s entertaining the whole way through, and is enough to leave you extremely satisfied. Picking up directly after the end of season 1 of the TV series, the movie follows our heroes as they board a train where the Lower One of the Twelve Kizuki lurks in the shadows. The film has some amazing character development and introduces the Flame Hashira; Kyōjurō Rengoku who had briefly appeared in the series prior to the movie. All characters are given true personality through the voice over performances, which is enough to make you sympathize with them. While all the characters have their moments to shine; Nezuko and Zenitsu in particular, the three who still the show are Tanjiro, Rengoku, and the Lower Moon One: Enmu Tamio. Tanjiro and Rengoku serve as the emotional hearts of the film and both are given plenty of character development throughout the film’s two hour runtime. Enmu on the other hand, is the perfect villain for our heroes to face. In both the sub and dub voices he captures your attention, and his words are absolutely bone-chilling and entertaining to hear and watch. The animations are absolutely spectacular and truly add to the scope of the movie. More so than any other anime film, spectacle is the clear key here. The film provides you with eye-popping visuals that will surly make you wonder in awe. The soundtrack is without a doubt beautiful, with some tracks appropriately upbeat and thrilling, and others somber and captivating. Overall I highly recommend this movie for anyone who is anime fan. If you’ve seen the TV series or read the manga, you’ll definitely find this film an immense crowd-pleaser. To put simply, definitely check out this movie. Beyond all recognition, this movie is the definition of a masterpiece.",
            avatar:"https://thetopflight.com/wp-content/uploads/getty-images/2017/07/1311403643-850x560.jpeg"
        },
        {
            author:"Brick’n Wolf",
            body:"Demon Slayer the Movie: Mugen Train is one of the best anime films of all-time period. This movie absolutely deserves the praise its getting. I have a lot of list to explain why this is one of the best films of all-time. Spoilers for those who haven't watched it yet. The Story: the story stays perfectly faithful to the manga version. While in the manga, Tanjiro, Nezuko, Zenitsu, and Inosuke went to the train to find Rengoku to ask about Tanjiro's ability, the movie version changes as a mission for the four to aid him in hunting down the demon attacking the train. However, most of the moments in this movie are incredibly faithful to the manga, showing how well the writers were perfectly staying faithful to the manga. The Visuals: As expected from many studios, the animation gives us stunning visuals, with the train's design, the battles, and even the design of (SPOILER) Enmu's train fusing body. the animation must have taken days, so the designers hard works pays off as we blessed with beautiful animation. The battles in particular, are praise-worthy, as we see the characters' fighting styles once more, and the animation we are gifted to see. The Characters and voice acting: Like last time, Tanjiro, Nezuko, Zenitsu, and Inosuke becomes more likeable than ever from their funny moments to their epic battles, it's really nice to see them again. both the Japanese and English voice actors still do a splendid job with their roles. the villains, Enmu and (SPOILER) Akaza, are also incredible great villains as they give our heroes a major struggle. Their Japanese and English voice acting are also done well. However, beside Tanjiro, we have to give the critical acclaim praise towards one of the greatest supporting characters, Kyojuro Rengoku, the Flame Hashira. In the tv series, we see Rengoku and what type of a man he is. The movie even gives us a much more clearer type of person Rengoku truly is. He's incredibly kind, heroic, noble, and honorable as he fights to protect mankind and always smiles. His voice actors, both the Japanese and English done a perfect job of Rengoku. The Music Score: The music is just... wow. Incredibly beautiful. The action-music, the heart-warming/tearjerker-music, just any type of music this movie throw at you will give you such emotions. Homura by LISA is an Oscar-worthy song to listen to. But if you do listen, and somewhat understand what she's singing about, prepare for tears. And now... the BIG ONE. BIG SPOILER ALERT! Read at your own risk. Tanjiro and Rengoku: These two are the biggest main characters of this movie in my opinion. And for good reasons. We see that Tanjiro wishes to learn about his ability, Hinokami Kagura Dance and Rengoku, who sees great interest in him, offers to become his mentor. Tanjiro and Rengoku are almost similar in a way, as they both have siblings who they deeply love and are both honorable and heroic warriors, who wish to end Muzan and bring peace to mankind. And just as we thought, that after Tanjiro and Inosuke finally defeat and killed Enmu, the heroes earn their victory, the Upper Moon 3, Akaza arrives and tries to recruit Rengoku while Akaza tries to kill Tanjiro and the 200 passengers, including Nezuko, Zenitsu, and Inosuke. And after a fierce fight, Rengoku ultimately loses his life, but not before encouraging Tanjiro to lift his heart ablaze and giving out one last smile on his face. This greatly affects Tanjiro, as he's deeply sadden by his death. It show how much influence Rengoku had on Tanjiro. Overall, this is one of the greatest films ever to be seen and I hope you all enjoy it! LIFT YOUR HEART ABLAZE! 🔥🔥🔥",
            avatar:"https://static.turbosquid.com/Preview/2015/11/25__00_38_10/75083_signature.jpgba53c1b7-24b9-4fcd-b48e-9665389e16cbLarge.jpg"
        },
        {
            author:"Gemma Ces8472",
            body:"I LOVE THE SHOW AND THE MOVIE ITS SO GOOD. I literally have SO MUCH backgrounds of  Demon Slayer my 5 favorite characters are Tanjiro Kamado, Hashibira Inozuka, Sanemi Shinazugawa, Zezuko Kamado and Tengen Uzui not the dad Tanjiro. I ask my friends if they watched Demon Slayer and they said yes they love it so much my friends Emerson, Ava P., Ava G, Lily, Isabella Cindy, Evelyn, and I watch it me and them LOVE IT SO MUCH we are waiting for season 2 I her'd that Tanjiro gets married and have kids and gets tuned into a demon thats just sad that hes getting turned into a demon but a really good twist tho. Im 10 and I love Tanjiro, Tengen, and Sanemi I know that there amine but the people are really good at there anime art. My mom almost band me from watching demon slayer but i talked her into letting watch it and she said fine you can watch is its not easy to convince my mom my dad don't like the title but he didn't make the show or the movie so so he does not get to name the movie or the show its you guys who get to do that. My little 6 year old sister she does not know what a really good anime show and movie is.❤ u guys so much bye. - Gemma",
            avatar:"https://d10-invdn-com.investing.com/company_logo/35835e7e8db9a3ecd31f124e9065d847.jpg"
        },
        {
            author:"Random Human",
            body:"This movie was absolutely stunning with breathtaking art and animation and a gripping storyline. It did not disappoint one bit. The music in each scene set the atmosphere and tone perfectly, at one point giving a throwback to Kamado Tanjiro no Uta using the same music and voice with different lyrics that set a similar yet different tone, which struck a chord in my heart as it was used in a serious and sad moment. There aren't any words for how beautiful the scenery and animation were in small moments. (for a while I was seriously convinced that they were using 120 fps for a few parts lol) I definitely recommend seeing this movie either at the theater or watching it at home once it is available to buy. I also recommend stopping by the restroom before you watch because you don't want to get stuck not wanting to leave to go haha.(I recommend bringing some tissues too..... for no reason...) Have a great day!",
            avatar:"https://c.stocksy.com/a/dwR200/z9/584079.jpg"
        }
    ]
};

const Movie = require('./models/movie');
// const kunal = require('./kunal');
// const vans = require('./vans');
Movie.create(demonSlayer)
.then(movie =>{
    console.log(movie);
})
.catch(err => console.log(err));
//Routes
const authRoutes = require('./routes/auth'),
profileRoutes = require("./routes/profile"),
indexRoutes = require("./routes/index"),
movieRoutes = require("./routes/movie");

// Using the routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/movie', movieRoutes);

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})