import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Movies } from '../global/Movies';
import dummyData from '../global/dummyData';
import { SmallHeading } from '../global/styles';

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


const Parent = styled.div`
    position:relative;
    width:95vw;
    margin:auto;
`;


const MustWatch = () =>{
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
            <SmallHeading text="Must Watch" /><br /><br />
            <Movies payload={movies} />
        </Parent>
    )
};

export default MustWatch;