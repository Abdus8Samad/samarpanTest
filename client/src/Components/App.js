import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import { useMisc, useSetMisc } from "./Contexts/misc";
import { useSnackbar } from "notistack";
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
import Categories from "./Categories/Categories";
import { useSetUser, useUser } from "./Contexts/user";

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
    const misc = useMisc();
    const setUser = useSetUser();
    const setMisc = useSetMisc();
    const getUser = () =>{
        axios.get('/auth/getUser')
        .then(res =>{
            setUser(res.data);
            setMisc({...misc, userLoaded: true});
        })
        .catch(err =>{
            console.log(err);
            setMisc({...misc, userLoaded: true});
            enqueueSnackbar(err.response.status + " Internal Server Error !", { variant : "error" });
        })
    }
    useEffect(() =>{
        /* Set Lazy Loading In Images */
        let imgs = document.querySelectorAll('img');
        for(let img of imgs) img.loading = "lazy";
        /* -------------------------- */
        scrollingEffect();
        window.addEventListener('load', () => scrollingEffect());
        window.addEventListener('scroll', () => scrollingEffect());
        return () =>{
            window.removeEventListener('load', () => scrollingEffect);
            window.removeEventListener('scroll', () => scrollingEffect());
        }
    }, []);
    useEffect(() =>{
        if(!misc.userLoaded){
            getUser();
        }
    })
    const scrollTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return(
        <div className="App">
            <Helmet><title>{misc.title} - Samarpan</title></Helmet>
            <MainBody>
                <Switch>
                    <Route exact path="/test" component={Test} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/categories/:name" component={Categories} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/profile/:name" component={Profile} />
                    <Route exact path="/movie/:name" component={Movie} />
                    <Route exact path="*" component={Home} />
                </Switch>
            </MainBody>
            <ScrollToTop onClick={() => scrollTop()} className="scrollToTop" ><ExpandLessRoundedIcon /></ScrollToTop>
            {misc.isFooter ? <Footer /> : <></>}
            {misc.isTopbar ? <TopBar /> : <></>}
        </div>
    )
}

export default withRouter(App);