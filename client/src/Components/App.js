import React, { useEffect } from "react";
import { Switch, withRouter } from "react-router";
import styled from 'styled-components';
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import EditProfile from './Profile/EditProfile';
import TopBar from './TopBar';
import Footer from './Footer';
import MyRoute from "./global/MyRoute";
import { useSetUser } from "./Contexts/User";
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { useSnackbar } from "notistack";
import LoadData from "./global/LoadData";
import { useSetLoadingState } from "./Contexts/LoadingState";

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
    const setUser = useSetUser();
    const setLoading = useSetLoadingState();
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
        LoadData(setUser, setLoading, enqueueSnackbar);
        scrollingEffect();
        window.addEventListener('scroll',scrollingEffect);
    }, []);
    return(
        <div className="App">
            <MainBody>
                <Switch>
                    <MyRoute path="/login" component={<Login />} name="login" />
                    <MyRoute path="/register" component={<Register />} name="register" />
                    <MyRoute path="/profile/:name" component={<Profile />} name="profile" />
                    <MyRoute path="/profile/edit" component={<EditProfile />} name="editprofile" />
                    <MyRoute path="/profile" component={<Profile />} name="myprofile" />
                    <MyRoute path="*" component={<Home />} />
                </Switch>
            </MainBody>
            <ScrollToTop login={props.location.pathname !== "/"} href="#top" className="scrollToTop"><ExpandLessRoundedIcon /></ScrollToTop>
            {props.location.pathname !== "/" ? ("") : (
                <>
                    <TopBar />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default withRouter(App);