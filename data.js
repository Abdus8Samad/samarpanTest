// Top Rated:
const Data = [
    {
        title:"The Witcher",
        src:"https://www.gamespot.com/a/uploads/original/1582/15828986/3606754-witcher%20poster.jpg",
        link:"/the-witcher",
        genre:"Fantasy",
        rating:9.5
    },
    {
        title:"13 Reasons Why",
        src:"https://rukminim1.flixcart.com/image/416/416/jcp4b680/poster/x/m/y/medium-13-reasons-why-tv-series-posters-for-home-office-love0073-original-imaffgxbzrguqqsg.jpeg?q=70",
        link:"/trw",
        genre:"Mystery",
        rating:9.1
    },
    {
        title:"Dark",
        src:"https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMS00MDJlLTgzNTEtNzQzYjFhNjA0YjBjXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_.jpg",
        link:"/dark",
        genre:"Supernatural",
        rating:9.7
    },
    {
        title:"Psycho Pass",
        src:"https://m.media-amazon.com/images/M/MV5BYmNlMTYzNDMtZjI5NS00NTdjLTlkYWMtMWMzZWJjODY2YzAzXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        link:"/psycho-pass",
        genre:"Cyberpunk",
        rating:9.3
    },
    {
        title:"Rick And Morty",
        src:"https://m.media-amazon.com/images/I/81LBzgzf0iL._SY741_.jpg",
        link:"/ricknmorty",
        genre:"Dark Comedy",
        rating:9.2
    },
    {
        title:"You",
        src:"https://i.pinimg.com/originals/88/43/1a/88431a9ed1430dd5359e13002b24c824.jpg",
        link:"/you",
        genre:"Crime Novel",
        rating:8.8
    },
    {
        title:"Kakegurui",
        src:"https://m.media-amazon.com/images/M/MV5BMmRhZDI4ODItYTAzMC00NWQ1LTk1MTctZWYyMDY3ZTU3NWFiXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
        link:"/kakegurui",
        genre:"Gambling",
        rating:8.7
    },
    {
        title:"Lucifer",
        src:"https://tvline.com/wp-content/uploads/2021/08/lucifer-final-season-6-poster.jpg",
        link:"/lucifer",
        genre:"Urban Fantasy",
        rating:9.4
    },
    {
        title:"The 100",
        src:"https://m.media-amazon.com/images/M/MV5BNjRiYTIzZmUtMTFkNS00ZTM0LWE4ODAtMDliMGE4NzM5ZjVlXkEyXkFqcGdeQXVyNDQ0MTYzMDA@._V1_.jpg",
        link:"/the-100",
        genre:"Dystopia",
        rating:9
    },
    {
        title:"Attack On Titan",
        src:"https://m.media-amazon.com/images/I/81dH7-pkjiL._SL1500_.jpg",
        link:"/aot",
        genre:"Action",
        rating:9.8
    },
    {
        title:"Detective Conan",
        src:"https://i.pinimg.com/originals/3b/3d/af/3b3daf692707d66fdaa1d5f7b10318e8.jpg",
        link:"/detective-conan",
        genre:"Mystery",
        rating:9.6
    },
    {
        title:"Interstellar",
        src:"https://cdn.shopify.com/s/files/1/1416/8662/products/interstellar_2014_advance_original_film_art_682852f2-23f6-46de-a1db-4029d5b6f0b4_5000x.jpg?v=1574284010",
        link:"/interstellar",
        genre:"Sci-fi",
        rating:9.4
    },
]

// MustWatch:
const Data = [
    {
        title:"Spirited Away",
        src:"https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        link:"/spirited-away",
        genre:"Horror",
        rating:8.6
    },
    {
        title:"Dunkirk",
        src:"https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg",
        link:"/Dunkirk",
        genre:"War",
        rating:8.7
    },
    {
        title:"Friends",
        src:"https://cdn.shopify.com/s/files/1/0151/0741/products/pg1004_1024x1024.jpg?v=1578633269",
        link:"/friends",
        genre:"Sitcom",
        rating:8.4
    },
    {
        title:"PK",
        src:"https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_.jpg",
        link:"/pk",
        genre:"Comedy",
        rating:8.2
    },
    {
        title:"Inception",
        src:"https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
        link:"/inception",
        genre:"Sci-fi",
        rating:9.2
    },
    {
        title:"Hacksaw Ridge",
        src:"https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_.jpg",
        link:"/hacksaw-ridge",
        genre:"War",
        rating:9.5
    },
    {
        title:"Mr Robot",
        src:"https://m.media-amazon.com/images/M/MV5BMzgxMmQxZjQtNDdmMC00MjRlLTk1MDEtZDcwNTdmOTg0YzA2XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
        link:"/mr-robot",
        genre:"Psycho",
        rating:9.3
    },
    {
        title:"Shawshank Redemption",
        src:"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        link:"/shawshank-redemption",
        genre:"Prison",
        rating:8.3
    },
    {
        title:"Money Heist",
        src:"https://m.media-amazon.com/images/M/MV5BNDJkYzY3MzMtMGFhYi00MmQ4LWJkNTgtZGNiZWZmMTMxNzdlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
        link:"/money-heist",
        genre:"Heist",
        rating:9.6
    },
    {
        title:"Anabelle",
        src:"https://m.media-amazon.com/images/M/MV5BOTQwZmQyYzEtODk5ZC00OTY3LWExMjAtYzRjNWFhNGM3MzBlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg",
        link:"/anabelle",
        genre:"Horror",
        rating:7.8
    },
    {
        title:"Demon Slayer: Mugen Train",
        src:"https://m.media-amazon.com/images/M/MV5BN2EwNTUwYWItZTY4ZC00N2Q1LWFhZWQtNjMwMDBkZDVmYThjXkEyXkFqcGdeQXVyOTA2OTk0MDg@._V1_.jpg",
        genre:"Fantasy",
        rating:9.4
    }
]

// Trending:
const Data = [
    {
        title:"The Suicide Squad(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_.jpg",
        link:"/suicidesquad",
        genre:"Action",
        rating:9.2
    },
    {
        title:"Venom(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_.jpg",
        link:"/venom",
        genre:"Sci-fi",
        rating:8.2
    },
    {
        title:"Cindrella(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BZTk3ZTEzNGUtZTcwYy00NmRmLWFhMGYtZjA4NWY1ZWI4MzMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
        link:"/cindrella",
        genre:"Adventure",
        rating:8
    },
    {
        title:"Peaky Blinders",
        src:"https://cdn.shopify.com/s/files/1/0969/9128/products/PeakyBlinders-ThomasShelby-GarrisonBombing-NetflixTVShow-ArtPoster_a29a5be9-9611-43d9-b415-18655f60c629.jpg?v=1619864667",
        link:"/peaky-blinders",
        genre:"Crime",
        rating:9.7
    },
    {
        title:"No time to die",
        src:"https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
        link:"/no-time-to-die",
        genre:"Action",
        rating:9
    },
    {
        title:"Bhoot Police",
        src:"https://m.media-amazon.com/images/M/MV5BNDE3OGNjYjUtY2FiYy00MTE4LWJhNWQtODBmNGZhMGU2MDExXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_.jpg",
        link:"/bhoot-police",
        genre:"Horror",
        rating:8.3
    },
    {
        title:"Sex Education",
        src:"https://m.media-amazon.com/images/M/MV5BODhmN2Q4ZjUtNzE5Ni00YWQxLThmYjYtM2NkNDEwNmFhMGY3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
        link:"/sex-education",
        genre:"Romance",
        rating:9.4
    },
    {
        title:"Candy Man",
        src:"https://m.media-amazon.com/images/M/MV5BMzc4YzBiZTItMDVhYi00MzhkLTllNmItZTgyYTFkY2E2MGU3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        link:"/candyman",
        genre:"Thriller",
        rating:9.4
    },
    {
        title:"Money Heist",
        src:"https://m.media-amazon.com/images/M/MV5BNDJkYzY3MzMtMGFhYi00MmQ4LWJkNTgtZGNiZWZmMTMxNzdlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg",
        link:"/money-heist",
        genre:"Heist",
        rating:9.6
    },
    {
        title:"Mr Robot",
        src:"https://m.media-amazon.com/images/M/MV5BMzgxMmQxZjQtNDdmMC00MjRlLTk1MDEtZDcwNTdmOTg0YzA2XkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
        link:"/mr-robot",
        genre:"Psycho",
        rating:9.3
    }
]
