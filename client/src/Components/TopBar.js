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
    color:white !important;
    transform:translate(-50%, 0);
`;
    
const List = styled.div`
    position:relative;
    background:rgba(0, 0, 0, 0.4);
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
    &.user:hover img{
        top:-2px;
    }
`;

const UserImg = styled.img`
    width:40px;
    height:40px;
    min-width:20px;
    border-radius:50%;
    vertical-align:middle;
    position:relative;
    transition:all 0.15s ease-out;
    top:0;
    ${media(500)}{
        width:42px;
    }
    ${media(380)}{
        width:30px;
    }
`;
    
// const Logo = styled(Link)`
//     font-size:30px;
//     color:white !important;
//     vertical-align:center;
// `;

const TopBar = () =>{
    const User = useUser();
    return(
        <Parent>
            <List>
                <Links to='/Categories'>Categories</Links>
                <Links to='/Movies'>Movies</Links>
                {/* <Logo to='/' className="logo">Samarpan&trade;</Logo> */}
                <Links to='/Anime'>Anime</Links>
                <Links to='/Series'>Series</Links>
                <Links to={(User === "") ? "/login" : `/profile/${User.username}`} className="user"><UserImg src={(User !== "") ? (User.avatar) : ("https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png")} /></Links>
            </List>
        </Parent>
    )
}

export default TopBar;