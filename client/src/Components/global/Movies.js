import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    display:flex;
    flex-flow:row wrap;
    width:85vw;
    margin:auto;
    align-items:center;
    gap:20px 10px;
    justify-content:space-around;
`;

const Poster = styled.img`
    width:100%;
`;

const Info = styled.div`
    width:100%;
    span.rating{
        float:left;
    }
    span.genre{
        float:right;
    }
`;

const Chip = styled.div`
    padding:5px;
    font-size:80%;
    border-radius:8px;
    background:${props => props.background};
`;

const Paper = styled(Link)`
    color:white;
    width:20%;
    p{
        width:100%;
        font-size:smaller;
    }
    transition:all 0.2s ease-in-out;
    &:hover{
        transform:scale(1.1);
    }
    ${media(900)}{
        width:30%;
    }
    ${media(600)}{
        width:40%;
    }
`;

const LoadingAnimation = keyframes`
    0%{opacity:0.3;}
    20%{opacity:0.6;}
    40%{opacity:1;}
    70%{opacity:0.6;}
    100%{opacity:0.2;}
`;

const ImagePlaceholder = styled.div`
    width:100%;
    height:300px;
    background:black;
    opacity:0;
    animation:${LoadingAnimation} 2s linear 0s infinite normal;
`;

const Movies = (props) =>{
    return(
        <Parent>
            {props.payload.map((movie, index) =>{
                return(
                    <Paper to={movie.link} className={index > 3 ? "scrollEffect" : ""} key={index}>
                        {props.payload[0].state === "dummy" ? (
                            <ImagePlaceholder width={100}/>
                        ) : (<Poster src={movie.src} />)}
                        <p>{movie.title}</p>
                        <Info>
                            <span className="rating">
                                <StarRateRoundedIcon />
                                {movie.rating}
                            </span>
                            <span className="genre">
                                <Chip background="#BB86fc">
                                    {movie.genre}
                                </Chip>
                            </span>
                        </Info>
                    </Paper>
                )
            })}
        </Parent>
    )
}

export {
    Movies,
    Chip,
    ImagePlaceholder
};