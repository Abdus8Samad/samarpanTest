import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Movies } from '../global/Movies';
import dummyData from '../global/dummyData';

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


const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    position:relative;
    top:-20px;
    width:95vw;
    margin:auto;
`;

const Title = styled.p`
    font-size:30px;
    ${media(600)}{
        font-size:25px;
    }
`;

const Hr = styled.hr`
    position:relative;
    top:-15px;
    width:85vw;
    float:left;
    border:1px solid white;
    ${media(600)}{
        width:60vw;
    }
`;

const TopRated = () =>{
    const [movies, setMovies] = useState(dummyData);
    useEffect(() =>{
        setTimeout(() => setMovies(Data), 6000);
    }, [])
    return(
        <Parent>
            <Title>Top Rated</Title>
            <Hr />
            <Movies payload={movies} />
        </Parent>
    )
};

export default TopRated;