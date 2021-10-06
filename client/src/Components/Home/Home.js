import React, { useEffect, useState, useLayoutEffect } from "react";
import styled from 'styled-components';
import MyButton from "../global/MyButton";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { Carousel } from "react-responsive-carousel";
import Trending from "./Trending";
import MustWatch from "./MustWatch";
import TopRated from "./TopRated";
import avengers from '../images/AvengersPoster.png';
import strangerThings from '../images/StrangerThingsPoster.png';
import luciferPoster from '../images/LuciferPoster.png';
import luciferPotrait from '../images/LuciferPosterPotrait.png';
import aot from '../images/AOTPoster.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    width:100%;
    padding-bottom:50px;
`;

const TopMovies = styled.div`
    width:100%;
`;

const Movie = styled.div`
    width:100%;
    height:450px;
    &:after{
        content:'\A';
        position:absolute;
        width:100%; height:450px;
        top:0; left:0;
        background:rgba(0,0,0,0.4);
        opacity:1;
    }
    ${media(600)}{
        height:800px;
        &:after{
            height:800px;
        }
    }
`;

const Poster = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
`;

const Overview = styled.div`
    position:absolute;
    width:50vw;
    z-index:10;
    top:10px;
    left:5vw;
    padding:20px;
    color:white;
    ${media(800)}{
        width:60vw;
        left:0.7vw;
    }
    ${media(600)}{
        width:90vw;
        top:50px;
        left:50%;
        transform:translate(-50%, 0);
        *{
            text-align:center !important;
        }
    }
    p.desc{
        position:relative;
        top:-15px;
        text-align:left;
        color:rgba(255, 255, 255, 0.8);
    }
`;

const Score = styled.table`
    position:absolute;
    color:white;
    z-index:10;
    text-align:center;
    width:40vw;
    right:10px;
    top:150px;
    border-collapse:collapse;
    td, th{
        padding:5px;
    }
    th{
        font-size: 2.4vw;
    }
    span.rating{
        font-size: 3vw;
    }
    span.ratedBy{
        color: lightgrey;
        font-size:1.2vw;
    }
    span.score{
        color:darkorange;
        font-size:3vw;
        font-weight:bolder;
    }
    td:first-child span{
        position:relative;
        left:-13px;
    }
    ${media(800)}{
        right:0;
    }
    ${media(600)}{
        top:420px;
        left:50%;
        transform:translate(-50%, 0);
        width:95vw;
        span.rating{
            font-size:6vw;
        }
        span.ratedBy{
            font-size:3.7vw;
        }
        span.score{
            font-size:6vw;
        }
        th{
            font-size:5vw;
        }
        svg{
            font-size:10vw;
        }
    }
    ${media(400)}{
        top:500px;
    }
`;

const Title = styled.p`
    font-size:45px;
    text-align:left;
    ${media(900)}{
        font-size:40px;
    }
`;

const ButtonGroup = styled.div`
    position:absolute;
    bottom:10px;
    left:5vw;
    z-index:100;
    margin-top:20px;
    display:flex;
    padding:10px;
    width:40vw;
    justify-content:space-around;
    *{
        margin:20px;
    }
    ${media(800)}{
        width:80vw;
        bottom:10px;
        left:50%;
        transform:translate(-50%, 0);
    }
    ${media(500)}{
        width:100vw;
        a{
            width:50vw;
        }
    }
`;

const Home = () =>{
    const [lucifer, setLucifer] = useState(luciferPoster);
    const [width, setWidth] = useState(0);
    const MovieWrapper = ({rating, ratedBy, score, src, desc, title}) =>{
        return(
            <Movie>
                <Poster src={src} alt="AVEGERS" />
                <Overview>
                    <Title>{title}</Title>
                    <p className="desc">{desc}</p>
                </Overview>
                <ButtonGroup>
                    <MyButton to='/avengers/rate' back="none" color="white" size="25vw" border label='Rate Now' />
                    <MyButton to='/avengers' back="black" color="white" size="25vw" label='More Info' />
                </ButtonGroup>
                <Score>
                    <tbody>
                        <tr>
                            <th>SMP Rating</th>
                            <th>Critic Score</th>
                        </tr>
                        <tr>
                            <td style={{"color":"rgba(255, 255, 255, 0.8)"}}>
                                <StarRateRoundedIcon sx={{"float":"left","fontSize":"4vw", "verticalAlign":"bottom", "color":"#faaf00"}} />
                                <span className="rating">
                                    {rating}/ 
                                </span>
                                <span className="ratedBy">{ratedBy}</span>
                            </td>
                            <td>
                                <span className="score">{score}</span>
                            </td>
                        </tr>
                    </tbody>
                </Score>
            </Movie>
        )
    }
    const Main = () =>{
        return(
            <Parent className="Home">
                <TopMovies id="Top">
                    <Carousel autoPlay infiniteLoop interval="8000" showThumbs={false}>
                        <MovieWrapper
                            desc={"After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."}
                            title={"The Avengers Endgame"}
                            src={avengers}
                            score={"86"}
                            rating={"9.2"}
                            ratedBy={"970k"}
                        />
                        <MovieWrapper
                            desc={"In a small town where everyone knows everyone, a peculiar incident starts a chain of events that leads to the disappearance of a child, which begins to tear at the fabric of an otherwise peaceful community."}
                            title={"Stranger Things"}
                            src={strangerThings}
                            score={"93"}
                            rating={"9.8"}
                            ratedBy={"1070k"}
                        />
                        <MovieWrapper
                            desc={"After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction."}
                            title={"Attack On Titan"}
                            src={aot}
                            score={"97"}
                            rating={"9.9"}
                            ratedBy={"1670k"}
                        />
                        <MovieWrapper
                            desc={"Lucifer Morningstar has decided he's had enough of being the dutiful servant in Hell and decides to spend some time on Earth to better understand humanity. He settles in Los Angeles - the City of Angels."}
                            title={"Lucifer"}
                            src={lucifer}
                            score={"91"}
                            rating={"8.9"}
                            ratedBy={"920k"}
                        />
                    </Carousel>
                </TopMovies>
                <TopRated />
                <Trending />
                <MustWatch />
            </Parent>
        )
    }
    const sizeChange = () =>{
        if(window.innerWidth <= 600){
            setLucifer(luciferPotrait);
        } else {
            setLucifer(luciferPoster);
        }
    }
    useEffect(() =>{
        sizeChange();
    }, [])
    useLayoutEffect(() =>{
        window.addEventListener('resize', sizeChange);
        sizeChange();
        return () => window.removeEventListener('resize', sizeChange);
    }, []);
    return(
        // (width >= 500) ? (<SmoothProvider><Main /></SmoothProvider>) : (<Main />)
        <Main />
    );
};

export default Home;