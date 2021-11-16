import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import { useSetUser, useUser } from "./Contexts/User";
import { useSnackbar } from "notistack";
import { useLoading, useSetLoading } from "./Contexts/LoadingState";
import { scrollingEffect } from "./utils/scrollingEffect";
import axios from "axios";
import styled from 'styled-components';
import TopBar from './TopBar';
import Footer from './Footer';
import Home from "./Home/Home";
import Test from "./Test/Test";
import Login from "./Login/Login";
import Movie from "./Movie/Movie";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const MainBody = styled.div`
    position:relative;
    z-index:40;
    width:100%;
    color:white;
    background: rgb(27,27,27);
    background: linear-gradient(0deg, rgba(27,27,27,1) 10%, rgba(18,18,18,1) 100%);
`;

const ScrollToTop = styled.p`
    position:fixed;
    padding:15px;
    bottom:10px;
    right:10px;
    border-radius:100%;
    background:#BB86fc;
    color:black;
    transition:all 0.2s ease;
    z-index:100;
    &:hover{
        opacity:1 !important;
        cursor:pointer;
    }
`;

const App = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [topTitle, setTopTitle] = useState("Home");
    const [RemoveTopbar, setRemoveTopbar] = useState(false);
    const [isFooter, setFooter] = useState(true);
    const User = useUser();
    const setUser = useSetUser();
    const Loading = useLoading();
    const setLoading = useSetLoading();
    const getUser = () =>{
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
    }
    useEffect(() =>{
        /* Set Lazy Loading In Images */
        let imgs = document.querySelectorAll('img');
        for(let img of imgs) img.loading = "lazy";
        /* -------------------------- */
        getUser();
        // scrollingEffect();
        // window.addEventListener('load', () => scrollingEffect());
        // window.addEventListener('scroll', () => scrollingEffect());
        // return () =>{
        //     window.removeEventListener('load', () => scrollingEffect);
        //     window.removeEventListener('scroll', () => scrollingEffect());
        // }
    }, []);
    const MyRoute = (attr) =>{
        return(
            <Route {...attr}>
                {() =>{
                        if(attr.path.substr(0, 8) === "/profile" || attr.path.substr(0, 6) === "/movie"){
                            if(attr.path.substr(0, 6) === "/movie") setFooter(true);
                            setRemoveTopbar(true);
                        } else {
                            setRemoveTopbar(false);
                            setFooter(false);
                            if(attr.path === "/login" || attr.path === "/register"){
                                setRemoveTopbar(true);
                            } else {
                                setRemoveTopbar(false);
                                setFooter(false);
                            }
                        }
                        setTopTitle(attr.title);
                        return attr.component;
                    }
                }
            </Route>
        )
    }
    const scrollTop = (e) =>{
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }
    return(
        <div className="App">
            <Helmet><title>{topTitle} - Samarpan</title></Helmet>
            <MainBody>
                <Switch>
                    <MyRoute exact path="/login" title="Login" component={<Login />} />
                    <MyRoute exact path="/register" title="SignUp" component={<Register />} />
                    <MyRoute exact path="/profile/:name" title="Profile" component={<Profile />} />
                    <MyRoute exact path="/movie/:name" title="Movie" component={<Movie />} />
                    <MyRoute exact path="/profile" title="Profile" component={<Profile />} />
                    <MyRoute exact path="/test" title="Test" component={<Test />} />
                    <MyRoute exact path="*" title="Home" component={<Home />} />
                </Switch>
            </MainBody>
            <ScrollToTop onClick={scrollTop} className="scrollToTop" ><ExpandLessRoundedIcon /></ScrollToTop>
            {RemoveTopbar ? (isFooter ? <Footer /> : "" ) : (
                <>
                    <TopBar />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default withRouter(App);