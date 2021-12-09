import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from './Contexts/User';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    position:fixed;
    top:4px;
    left:50%;
    z-index:100;
    font-size:110%;
    color:rgba(0, 0, 0, 0.85) !important;
    transform:translate(-50%, 0);
`;
    
const List = styled.div`
    position:relative;
    background:rgba(0, 0, 0, 0.34);
    backdrop-filter: blur(10px);
    border-radius:25px;
    width:80vw;
    padding:0.6%;
    margin:auto;
    display:inline-flex;
    height:fit-content;
    align-items:center;
    justify-content:space-evenly;
    ${media(500)}{
        width:96vw;
    }
`;

const Links = styled(Link)`
    color:white;
    padding: 1% 2.2%;
    letter-spacing:0.6px;
    position:relative;
    border-radius:15px;
    transition:all 0.2s ease;
    &::after {
        content: " ";
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        height:115%;
        width: 105%;
        z-index:-1;
        transition: .2s;
        border-radius: 20px;
    }
    &:not(.user, .logo):hover {
        &::after {
            background: linear-gradient(to bottom, #e8edec, #d2d1d3);
                box-shadow: 0px 3px 20px 0px black;
                transform:translate(-50%, -50%) scale(1.2);
        }
        color: black;
    }
    &.user{
        text-align:center;
        padding:0 !important;
    }
    ${media(600)}{
        padding:1% 2%;
        &::after{
            height:100%;
            width:90%;
        }
    }
    ${media(350)}{
        font-size:80% !important;
    }
`;
    
const SAvatar = styled(Avatar)`
    transition:all 0.1s ease-in;
    &:hover{
        opacity:0.8;
    }
`;

const TopBar = () =>{
    const User = useUser();
    return(
        <Parent>
            <List>
                <Links to='#' onClick={""}>Categories</Links>
                <Links to='/categories/movies'>Movies</Links>
                {/* <Logo to='/' className="logo">Samarpan&trade;</Logo> */}
                <Links to='/categories/animation'>Animation</Links>
                <Links to='/categories/series'>Series</Links>
                <Links to={(User === "") ? "/login" : `/profile/${User.username}`} className="user"><SAvatar src={(User !== "") ? (User.avatar) : ("https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png")} /></Links>
            </List>
        </Parent>
    )
}

export default TopBar;