import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from './Contexts/User';
import uuimg from './images/UUser.png';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    position:fixed;
    left:50%;
    top:0;
    z-index:100;
    font-size:120%;
    background:rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border-radius:25px;
    padding:0 0.6%;
    color:white !important;
    transform:translate(-50%, 0) scale(0.8);
    width:65vw;
    ${media(800)}{
        font-size:100%;
        padding:0 5%;
    }
    ${media(600)}{
        width:90vw;
        padding:0 1.25%;
    }
    ${media(400)}{
        font-size:14px;
        padding:0 0.65%;
        width:95vw;
    }
`;
    
const List = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
`;

const Links = styled(Link)`
    color:white;
    padding: 2% 3%;
    border-radius:15px;
    transition:all 0.2s ease;
    &:not(.user):hover{
        box-shadow: 0 0 20px black;
        transform: scale(1.1);
        background:white;
        color:black;
    }
    &.user{
        padding: 1% 2.2%;
        text-align:center;
    }
    ${media(600)}{
        padding:1.25% 2.5%;
    }
    &.user:hover img{
        top:-2px;
    }
`;

const UserImg = styled.img`
    width:40px;
    max-width:60px;
    border-radius:100%;
    position:relative;
    transition:all 0.15s ease-out;
    top:0;
    ${media(800)}{
        width:20px;
    }
    ${media(600)}{
        width:20px;
    }
    ${media(400)}{
        width:16px;
    }
`;

const TopBar = () =>{
    const User = useUser();
    return(
        <Parent>
            <List>
                <Links to='/Categories'>Categories</Links>
                <Links to='/Movies'>Movies</Links>
                <Links to='/Anime'>Anime</Links>
                <Links to='/Series'>Series</Links>
                <Links to={(User === "") ? "/login" : "/profile"} className="user"><UserImg src={(User !== "") ? (User.avatar) : ("https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png")} /></Links>
            </List>
        </Parent>
    )
}

export default TopBar;