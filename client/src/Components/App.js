import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Helmet } from 'react-helmet';
import axios from "axios";
import styled from 'styled-components';
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import TopBar from './TopBar';
import Footer from './Footer';
import { useSetUser, useUser } from "./Contexts/User";
import { useSetAlert, useAlert } from "./Contexts/Alerts";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const MainBody = styled.div`
    position:relative;
    z-index:40;
    width:100%;
    color:white;
    background:#121212;
;`

const ScrollToTop = styled.a`
    position:fixed;
    padding:15px;
    bottom:10px;
    right:10px;
    display:${props => props.login ? "none" : "initial"};
    border-radius:100%;
    background:#BB86fc;
    color:black;
    transition:all 0.2s ease;
    z-index:100;
    &:hover{
        opacity:1 !important;
    }
`;

const App = () => {
    const [loginPage, setLoginPage] = useState(false);
    const [topTitle, setTopTitle] = useState("Home");
    const User = useUser();
    const setUser = useSetUser();
    const setAlert = useSetAlert();
    const Alert = useAlert();
    const getElemDistance = ( elem ) => {
        var location = 0;
        if (elem.offsetParent) {
            do {
                location += elem.offsetTop;
                elem = elem.offsetParent;
            } while (elem);
        }
        return location >= 0 ? location : 0;
    };
    const visible = function(elem) {
        var diff = 450;
        var top = getElemDistance(elem);
        return (top <= window.scrollY + (diff));
    };
    const scrollingEffect = () =>{
        var scrollToTop = document.querySelector('a.scrollToTop');
        if(window.scrollY <= 40) scrollToTop.style.opacity = 0;
        else scrollToTop.style.opacity = 0.75;
        var scrollEffect = document.querySelectorAll('.scrollEffect');
        for(var x = 0;x < scrollEffect.length;x++){
            if(visible(scrollEffect[x])){
                if(!scrollEffect[x].classList.contains('alreadyVisible')){
                    scrollEffect[x].classList.add('come-in','alreadyVisible');
                }
            }
        }
    }
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert("");
    };
    useEffect(() =>{
        axios.get('/getUser')
        .then(res =>{
            setUser(res.data);
        })
        .catch(err =>{
            console.log(err);
            setAlert(["error", err.response.status + " Internal Server Error !"]);
        })
        scrollingEffect();
        window.addEventListener('scroll',scrollingEffect);
        console.log("home");
    }, []);
    const MyRoute = (props) =>{
        return(
            <Route {...props}>
                {() =>{
                        if(props.path === "/profile"){
                            if(User === ""){
                                setTopTitle('Home');
                                setLoginPage(false);
                                return <Redirect to='/' />;
                            } else setLoginPage(true);
                        }
                        if(props.path === "/login" || props.path === "/register"){
                            if(User !== ""){
                                setTopTitle('Home');
                                setLoginPage(false);
                                return <Redirect to='/' />;
                            } else setLoginPage(true);
                        }
                        else setLoginPage(false);
                        setTopTitle(props.title);
                        return props.component;
                    }
                }
            </Route>
        )
    }
    return(
        <div className="App">
            <Helmet><title>{topTitle}</title></Helmet>
            <MainBody>
                <Switch>
                    <MyRoute exact path="/login" title="Login" component={<Login />} />
                    <MyRoute exact path="/register" title="SignUp" component={<Register />} />
                    <MyRoute exact path="/profile" title="Profile" component={<Profile />} />
                    <MyRoute exact path="*" component={<Home />} title="Home" />
                </Switch>
            </MainBody>
            <ScrollToTop login={loginPage} href="#top" className="scrollToTop"><ExpandLessRoundedIcon /></ScrollToTop>
            {loginPage ? ("") : (
                <>
                    <TopBar />
                    <Footer />
                </>
            )}
            {
                (Alert === "") ? ("") :
                (
                    <Snackbar open={Alert !== ""} autoHideDuration={6000} onClose={handleAlertClose} sx={{opacity:0.9}}>
                        <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity={Alert[0]} sx={{ width: '100%'}}>
                            {Alert[1]}
                        </MuiAlert>
                    </Snackbar>    
                )
            }
        </div>
    )
}

export default App;