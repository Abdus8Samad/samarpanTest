import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { SmallHeading } from '../global/styles';
import { Avatar } from '@mui/material';
import { ScoreLevel } from '../utils/ResolveLevel';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const dummyData = [
    {
        title:"The Suicide Squad(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_.jpg",
    },
    {
        title:"Venom(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_.jpg",
    },
    {
        title:"Cindrella(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BZTk3ZTEzNGUtZTcwYy00NmRmLWFhMGYtZjA4NWY1ZWI4MzMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    },
    {
        title:"Peaky Blinders",
        src:"https://cdn.shopify.com/s/files/1/0969/9128/products/PeakyBlinders-ThomasShelby-GarrisonBombing-NetflixTVShow-ArtPoster_a29a5be9-9611-43d9-b415-18655f60c629.jpg?v=1619864667",
    },
    {
        title:"No Time to Die",
        src:"https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
    },
];

const Parent = styled.div`
    margin:auto;
    display:flex;
    justify-content:space-between;
    padding-bottom:50px;
    ${media(900)}{
        display:block;
    }
`;

const StoryLine = styled.div`
`;
    
const Left = styled.div`
    padding-left:25px;
    width:45%;
    ${media(900)}{
        width:98%;
    }
`;
    
// background:rgb(255,220,88);
const Right = styled.div`
    color:rgba(0, 0, 0, 0.8);
    width:30%;
    background:#FFCC10;
    padding:30px 20px 50px 20px;
    ${media(900)}{
        width:100%;
        margin-top:50px;
        padding-left:20px;
    }
`;

const Rating = styled.div`
    margin-top:30px;
    p{
        text-align:center;
    }
    p:nth-child(2){
        margin-top:-5px;
        font-size:60px;
        font-weight:Bold;
    }
    p:nth-child(3){
        position:relative;
        top:-35px;
        font-size:15px;
    }
`;

const FullDetails = styled.div`
	margin-top:80px;
	span{
		font-weight:bold;
		color:white;
	}
	a{
		color:white;
		opacity:0.5;
		transition:all 0.2s ease;
		font-style:italic;
	}
	a:hover{
		opacity:0.85;
	}
	p.genre::nth-last-word{
		display:none;
	}
`;

const Score = styled.div`
    margin-top:55px;
	p{
		text-align:center;
		color:${props => props.color};
		font-size:60px;
		font-weight:bold;
	}
`;

const FullCast = styled.div`
    margin-top:80px;
    tr:first-child td:first-child { border-top-left-radius: 20px; }
    tr:first-child td:last-child { border-top-right-radius: 20px; }
    tr:last-child td:first-child { border-bottom-left-radius: 20px; }
    tr:last-child td:last-child { border-bottom-right-radius: 20px; }
    table{
        border-collapse: separate;
        text-align:center;
        margin:30px 20px;
        width:60vw;
    }
    td{
        position:relative;
        padding:10px;
        margin:20px;
        height:fit-content;
        position:relative;
    }
    td.avatar > div{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
    td.avatar{
        padding:30px;
    }
    td.name{
        width:500px;
    }
    td.role{
        width:500px;
    }
    td p{
        text-align:center;
    }
    a{
        color:inherit !important;
    }
    tr{
        transition:all 0.13s ease-in;
        margin-left:30px;
    }
    tr:hover{
        transform:scale(1.1) !important;
        box-shadow:0 0 5px rgba(0, 0, 0, 0.4);
        background:rgba(0, 0, 0, 0.8);
    }
    ${media(900)}{
        table{
            width:80vw;
            margin:50px auto;
        }
    }
    ${media(600)}{
        table{
            font-size:12px;
        }
    }
`;

const More = styled.div`
    margin-top:125px;
`;

const Movies = styled.div`
    display:flex;
    text-align:center;
    flex-flow:row wrap;
    width:100%;
    justify-content:space-around;
    gap:20px 10px;
    a{
        border-radius:5px;
        display:block;
        width:20%;
        min-width:120px;
        position:relative;
        color:inherit !important;
        font-size:small;
        transition:all 0.1s ease;
    }
    a:hover{
        transform:scale(1.1);
    }
    img{
        width:100%;
        border-radius:5px;
        margin-bottom:5px;
    }
    span{
        width:100%;
        display:inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
    }
`;

const Details = ({ movie }) =>{
    return(
        <Parent>
            <Left>
                <StoryLine className="scrollEffect">
                    <SmallHeading text="Storyline" /><br />
                    {movie.storyline}
                </StoryLine>
                <FullDetails className="scrollEffect">
                    <p>
                        <span>Title:</span> {movie.title}
                    </p>
                    <p>
                        <span>Released:</span> {movie.releasedOn} ({movie.releasedIn})
                    </p>
                    <p>
                        <span>Country Of Origin:</span> {movie.origin}
                    </p>
                    <p>
                        <span>Cast: </span>
                        {
                            movie.cast.slice(0, 4).map((char, index) =>{
                                return(
                                    <Link key={uuidv4()} to={{ pathname: char.wiki }} target="_blank">
                                        {char.name}, 
                                    </Link>
                                )
                            })
                        }
                    </p>
                    <p>
                        <span>Runtime:</span> {movie.runtime}
                    </p>
                    <p className="genre">
                        <span>Genres: </span>
                        {
                            movie.genres.slice(0, -1).map(g => <span key={uuidv4()}>{g} | </span>)
                        }
                        {
                            (movie.genres.length !== 1) ? (
                                <>{movie.genres.at(-1)}</>
                            ) : (null)
                        }
                    </p>
                </FullDetails>
                <FullCast className="scrollEffect">
                    <SmallHeading text="Full Cast" />
                    <table>
                        <tbody>
                            {
                                movie.cast.map((char, index) =>{
                                    return(
                                        <Fragment>
                                            <Link to={{pathname: char.wiki}} target="_blank" key={uuidv4()}>
                                                <tr>
                                                    <td className="avatar">
                                                        <Avatar alt={char.name} src={char.profilePic} />
                                                    </td>
                                                    <td className="name">
                                                        <p>{char.name}</p>
                                                    </td>
                                                    <td className="role">
                                                        <p>{char.role}</p>
                                                    </td>
                                                </tr>
                                            </Link>
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </FullCast>
            </Left>
            <Right>
                <Rating className="scrollEffect">
                    <h1>Rating</h1>
                    <p>{movie.averageRating}</p>
                    <p> 910k users | 245 critics</p>
                </Rating>
                <Score color={ScoreLevel(movie.criticScore)} className="scrollEffect">
                    <h1>Critic Score</h1>
                    <p>{movie.criticScore}</p>
                </Score>
                <More className="scrollEffect">
                    <h1>More Like This</h1><br />
                    <Movies>
                        {
                            dummyData.map((likeMovie, index) =>{
                                return(
                                    <Link to={`/movie/${likeMovie.title}`} key={uuidv4()}>
                                        <img src={likeMovie.src} alt={likeMovie.title} /><br />
                                        <span>{likeMovie.title}</span>
                                    </Link>
                                )
                            })
                        }
                    </Movies>
                </More>
            </Right>
        </Parent>
    )
}

export default Details;