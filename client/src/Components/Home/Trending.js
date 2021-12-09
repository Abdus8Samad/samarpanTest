import React, { useState, useEffect } from 'react';
import { Movies } from '../global/Movies';
import styled from 'styled-components';
import dummyData from '../global/dummyData';
import { SmallHeading } from '../global/styles';

const Data = [
    {
        title:"The Suicide Squad(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_.jpg",
        link:"/suicidesquad",
        genre:"Action",
        rating:9.2
    },
    {
        title:"Venom: Let There Be Carnage",
        src:"https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_.jpg",
        link:"/venom",
        genre:"Sci-fi",
        rating:8.2
    },
    {
        title:"Cinderella",
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
        title:"No Time to Die",
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
        title:"Candyman",
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

const Parent = styled.div`
    position:relative;
    width:95vw;
    margin:auto;
`;

const Trending = () =>{
    const [movies, setMovies] = useState(Data);
    // const [movies, setMovies] = useState(dummyData);
    // useEffect(() =>{
    //     let simulateLoading = setTimeout(() => setMovies(Data), 4000);
    //     return () =>{
    //         clearTimeout(simulateLoading);
    //     }
    // }, [])
    return(
        <Parent>
            <SmallHeading text="Trending" /><br /><br />
            <Movies payload={movies} />
        </Parent>
    )
};

export default Trending;