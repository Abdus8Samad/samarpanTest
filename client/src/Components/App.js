import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router";
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
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { useSnackbar } from "notistack";
import { useLoading, useSetLoading } from "./Contexts/LoadingState";

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

const App = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loginPage, setLoginPage] = useState(false);
    const [topTitle, setTopTitle] = useState("Home");
    const [profilePage, setprofilePage] = useState(false);
    const User = useUser();
    const setUser = useSetUser();
    const Loading = useLoading();
    const setLoading = useSetLoading();
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
        if(window.scrollY <= 40){
            scrollToTop.style.opacity = 0;
            scrollToTop.style.visibility = "hidden";
        }
        else {
            scrollToTop.style.opacity = 0.75;
            scrollToTop.style.visibility = "visible";
        }
        var scrollEffect = document.querySelectorAll('.scrollEffect');
        for(var x = 0;x < scrollEffect.length;x++){
            if(visible(scrollEffect[x])){
                if(!scrollEffect[x].classList.contains('alreadyVisible')){
                    scrollEffect[x].classList.add('come-in','alreadyVisible');
                }
            }
        }
    }
    useEffect(() =>{
        axios.get('/auth/getUser')
        .then(res =>{
            setUser(res.data);
            setLoading({...Loading, user : true});
        })
        .catch(err =>{
            console.log(err);
            setLoading({...Loading, user : true});
            enqueueSnackbar(err.response.status + " Internal Server Error !", { variant : "error" });
        })
        scrollingEffect();
        window.addEventListener('scroll',scrollingEffect);
    }, []);
    const MyRoute = (attr) =>{
        return(
            <Route {...attr}>
                {() =>{
                        if(attr.path.substr(0, 8) === "/profile"){
                            setprofilePage(true);
                        } else {
                            setprofilePage(false);
                            if(attr.path === "/login" || attr.path === "/register"){
                                setLoginPage(true);
                            } else setLoginPage(false);
                        }
                        setTopTitle(attr.title);
                        return attr.component;
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
                    <MyRoute exact path="/profile/:name" title="Profile" component={<Profile />} />
                    <MyRoute exact path="*" component={<Home />} title="Home" />
                </Switch>
            </MainBody>
            <ScrollToTop login={loginPage} href="#top" className="scrollToTop" style={{"display":profilePage ? "none" : "initial"}}><ExpandLessRoundedIcon /></ScrollToTop>
            {loginPage || profilePage ? ("") : (
                <>
                    <TopBar />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default withRouter(App);