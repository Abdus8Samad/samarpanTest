import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Profile/Profile';
import { Avatar, Tooltip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import MyButton from '../global/MyButton';
import HoverRating from './Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { UserTag } from './Movie';
import { useUser } from '../Contexts/user';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    background:url('${props => props.back}') no-repeat center fixed;
    background-size:cover;
    min-height:102vh;
    width:100%;
    position:relative;
    margin:0;
    &:after{
        content:'';
        position:absolute;
        width:100%; height:100%;
        z-index:10;
        top:0; left:0;
        background:rgba(0,0,0,0.45);
        opacity:1;
    }
    &:before{
        content:'';
        position:absolute;
        right:0;
        top:0;
        background:rgba(0, 0, 0, 0.4);
        height:100%;
        width:30%;
    }
    ${media(900)}{
        height:fit-content;
        padding-bottom:25px;
        &:before{
            display:none;
        }
    }
`;

const Content = styled.div`
    position:relative;
    z-index:50;
`;

const MainContent = styled.div`
    display:flex;
    letter-spacing:0 !important;
    width:90%;
    margin:auto;
    ${media(900)}{
        display:block;
    }
    ${media(350)}{
        width:100%;
    }
`;

const MovieInfo = styled.div`
    position:relative;
    width:80%;
    padding-left:30px;
    height:530px;
    ${media(900)}{
        width:85vw;
    }
`;

const MovieCast = styled.div`
    width:20%;
    span.dir{
        color:rgba(255, 255, 255, 0.6);
        font-size:small;
    }
    ${media(900)}{
        margin-top:80px;
        width:100%;
    }
`;

const P = styled.p`
    font-size:25px;
`;

const Cast = styled.div`
    display:flex;
    flex-flow:row wrap;
    gap:20px 10px;
    justify-content:space-between;
`;

const Character = styled(Link)`
    width:40%;
    display:inline-block;
    border-radius:8px;
    color:inherit !important;
    font-size:80%;
    transition:all 0.15s ease;
    span{
        opacity:0.8;
    }
    img{
        border-radius:8px;
        width:100%;
    }
    &:hover{
        transform:scale(1.1);
    }
    ${media(900)}{
        width:20%;
    }
    ${media(500)}{
        width:25%;
    }
`;

const BigTitle = styled.div`
    position:absolute;
    bottom:25px;
    a{
        font-size:20px;
        padding:12px;
    }
    a:nth-child(3){
        margin-left:25px;
    }
    ${media(700)}{
        a{
            font-size:15px;
            padding:10px;    
        }
    }
`;

const Released = styled.span`
    font-size:17px;
    display:block;
    margin-bottom:5px;
    text-transform:uppercase;
    span:first-child{
        opacity:0.6;
    }
    ${media(700)}{
        font-size:12px;
    }
`;

const Title = styled.p`
    word-break:break-all;
    width:100%;
    font-size:40px;
    position:relative;
    &:after{
        content:"";
        position:absolute;
        top:32px;
        right:0;
    }
    ${media(900)}{
        width:100%;
    }
    ${media(700)}{
        font-size:30px;
    }
`;

const Desc = styled.p`
    font-size:12px;
    position:relative;
    top:-20px;
`;

const Genre = styled.span`
    display:inline-block;
    padding:2px;
    margin:2px;
    border-radius:4px;
    color:black;
    background:#FFCC10;
`;

const UserIcon = styled(Link)`
    display:block;
    float:right;
    margin:10px;
    transition:all 0.1 ease-in;
    &:hover{
        opacity:0.8;
    }
`;

// const Img = styled.img`
//     width:40px;
//     height:40px;
//     border-radius:50%;
// `;

const TopBox = ({ movie, parentProps }) =>{
    const User  = useUser();
    return(
        <Parent back={movie.wall}>
        <Content>
            <Tooltip title="back" sx={{float: 'left', display: 'block'}}>
                <Button
                    onMouseDown={() => parentProps.history.goBack()}
                ><ArrowBackIcon /></Button>
            </Tooltip>
            {/* <UserIcon to={(User === "") ? "/login" : `/profile/${User.username}`} className="user"><Avatar src={(User !== "") ? (User.avatar) : ("https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png")} /></UserIcon> */}
            <MainContent>
                <MovieInfo>
                    <Desc>{movie.details}<br /><br />Genre: {movie.genres.map(g => <Genre key={uuidv4()}>{g}</Genre>)}</Desc>
                    <P>Your Rating</P>
                    <HoverRating movie={movie} title={movie.title} parentProps={{...parentProps}} />
                    <BigTitle>
                        <Title>
                            <Released><span>Released on </span><span>{movie.releasedOn}</span></Released>
                            {movie.title.toUpperCase()}
                        </Title>
                        <MyButton
                            to={{ pathname: movie.trailer }}
                            back="none"
                            color="white"
                            isborder="true"
                            label='Watch Trailer'
                            target="_blank"
                        />
                        <MyButton
                            to={{ pathname: movie.wiki }}
                            back="black"
                            color="white" 
                            label=' Wiki '
                            target="_blank"
                        />
                    </BigTitle>
                </MovieInfo>
                <MovieCast>
                    <UserTag>
                        <div>
                            <Avatar alt={movie.director.name} src={movie.director.img} />
                        </div>
                        <div>
                            <span className="name">{movie.director.name}</span><br />
                            <span className="dir">The Director</span>
                        </div>
                    </UserTag>
                    <P>Main Cast</P>
                    <Cast>
                        {
                            movie.cast.slice(0, 4).map((char, index) =>{
                                return(
                                    <Character key={uuidv4()} to={{ pathname: char.wiki }} target="_blank">
                                        <img src={char.profilePic} alt="cast" /><br />
                                        {char.name}<br />
                                        <span>as {char.role}</span>
                                    </Character>
                                )
                            })
                        }
                    </Cast>
                </MovieCast>
            </MainContent>
        </Content>
    </Parent>
    )
}

export default TopBox;