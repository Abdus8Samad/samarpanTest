import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo  from './images/logo.png';
import logoWhite  from './images/logoWhite.png';
import uuimg from './images/UUser.png';
import './styles/SideBar.scss';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    width:${props => props.expanded ? '10%' : '3%'};
    color: ${props => props.expanded ? "black" : "white"};
    box-shadow:4px 0 10px rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index:100; 
    left:0;
    top:0;
    padding: 1%;
    overflow:hidden;
    text-align:center;
    height:100vh;
    transition:all 0.2s cubic-bezier(.81, .06, .15, .96);
    *{
        transition: all 0.1s ease;
    }
`;

const Img = styled.img`
    opacity: ${props => props.expanded ? "1" : "0"};
    width:90%;
    position:realtive;
    margin-bottom:20px;
`;

const Logo = styled.img`
    display: block;
    visibility: ${props => props.expanded ? "hidden" : "visible"};
    width:2.5vw;
`;

const Button = styled(Link)`
    color:inherit;
    display:block;
    padding:20px;
    border-radius : 3px;
    font-size:1vw;
    &:hover{
        background:rgba(0, 0, 0, 0.2);
    }
`

const User = styled.img`
    width:35%;
    max-width:40px;
    border-radius:100%;
    border:2px solid rgba(0, 0, 0, 0.3);
    position:absolute;
    left:0;
    right:0;
    bottom:50px;
    margin-left:auto;
    margin-right:auto;
`;

const SideBar = () =>{
    const [width, setWidth] = useState(0);
    return(
        <Parent
            className="SideBar"
            onMouseEnter={() => setWidth(1)}
            onMouseLeave={() => setWidth(0)}
            expanded={width}
        >
            <Link to='/home'>
                <Img src={logoWhite} alt="Samarpan" expanded={width} />
            </Link>
            <Button to='/Categories'>Categories</Button>
            <Button to='/Movies'>Movies</Button>
            <Button to='/Series'>Series</Button>
            <Button to='/Cartoon'>Cartoon</Button>
            <Button to='/Anime'>Anime</Button>
            <Link to='/profile'>
                <User src={uuimg} alt="USER" />
            </Link>
        </Parent>
    )
}

export default SideBar;