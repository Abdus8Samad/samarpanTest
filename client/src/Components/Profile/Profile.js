import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled from 'styled-components';
import { useSetUser, useUser } from "../Contexts/User";
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from "notistack";
import timeSince from "../utils/TimeSince";
import ResolveLevel from "../utils/ResolveLevel";
import { Backdrop, CircularProgress, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLoading } from "../Contexts/LoadingState";
import { Link } from "react-router-dom";

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    color:rgba(255, 255, 255, 0.85);
`;

const Back = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index:-20;
    height:100vh;
    width:100vw;
    background:radial-gradient(circle, rgba(26,26,26,1) 0%, rgba(18,18,18,1) 100%) no-repeat;
    background-attachment:fixed;
`;

const Avatar = styled.div`
    text-align:center;
    min-height:25vw;
    position:relative;
    padding:20px 0;
    img{
        width:24vw;
        min-width:120px;
        border-radius:50%;
    }
    ${media(600)}{
        min-height:0;
    }
`;

const Container = styled.div`
    position:relative;
    width:90vw;
    padding:10px 10px 0 10px;
    min-height:90vh;
    background:radial-gradient(circle, rgba(26,26,26,1) 0%, rgba(18,18,18,1) 100%) no-repeat;
    margin:40px auto;
    border-radius:20px;
    z-index:40;
    ${media(600)}{
        padding:0;
    }
`;


const Details = styled.div`
    display:flex;
    width:100%;
    div{
        width:50%;
    }
    justify-content:space-around:
    align-items:center;
    position:relative;
    top:40px;
    ${media(700)}{
        display:block;
        div{
            width:100%;
            text-align:center;
        }
    }
`;

const About = styled.div`
    p.name{
        font-size:2.5rem;
        span{
            font-size:small;
        }
    }
    span.lev{
        display:block;
    }
    p.friends svg{
        opacity:0.8;
        border-radius:5px;
        transition:all 0.2s ease;
        vertical-align:middle;
        padding:5px;
        &:hover{
            background:rgba(255, 255, 255, 0.3);
            cursor:pointer;
            opacity:1;
        }
    }
    ${media(840)}{
        p.name{
            font-size:5vw;
        }
        font-size:12px;
    }
    ${media(600)}{
        p.name{
            font-size:30px;
        }
    }
`;

const Achievments = styled.div`
    display:flex;
    flex-flow:row wrap;
    background:rgba(40, 40, 40, 1);
    justify-content:center;
    border-radius:20px;
    margin-top:8rem;
    div{
        text-align:center;
        padding:0 6%;
    }
    ${media(600)}{
        font-size:smaller;
        margin-top:4.6rem;
    }
`;

const Stats = styled.div`
`;

const Buttons = styled.div`
    display:inline-block;
    float:right;
    & > .logout{
        transform:rotate(180deg);
    }
`;

const Button = styled.div`
    margin:10px;
    padding:10px;
    font-size:15px;
    color:white;
    border-radius:5px;
    opacity:0.8;
    transition:all 0.2s ease;
    display:inline-block;
    &:hover{
        background:rgba(255, 255, 255, 0.3);
        cursor:pointer;
        opacity:1;
    }
    ${media(600)}{
        padding:3px;
    }
    ${media(400)}{
        padding:0;
        svg{
            font-size:20px;
        }
    }
`;

const Top = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    background:radial-gradient(circle, rgba(26,26,26,1) 0%, rgba(18,18,18,1) 100%) no-repeat;
    box-shadow:0 2px 5px rgba(0, 0, 0, 0.5);
    a{
        position:absolute;
        font-size:30px;
        color:rgba(255, 255, 255, 0.85);
        top:13px;
        left:50%;
        transition:all 0.2s ease;
        transform:translateX(-50%);
    }
    a:hover{
        color:white;
    }
    ${media(600)}{
        a{
            top:11px;
            font-size:23px;
        }
    }
    ${media(400)}{
        a{
            top:8px;
        }
    }
    ${media(300)}{
        a{
            display:none;
        }
    }
`;

const Waiting = ({open}) =>{
    return(
        <Backdrop
            sx={{
                color:"#fff",
                position:"fixed",
                top:0,
                left:0,
                width:"100vw",
                height:"100vh"
            }}
            open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    )
}

const Main = ({props}) =>{
    const { enqueueSnackbar } = useSnackbar();
    const setUser = useSetUser();
    const myUser = useUser();
    const [profile, setProfile] = useState({
        username:"N/A",
        email:"N/A",
        avatar:"https://img.icons8.com/external-becris-flat-becris/64/000000/external-user-avatars-becris-flat-becris.png",
        reviewedMovies:[],
        ratedMovies:[],
        popularity:"0%",
        score:0,
        joinedAt:timeSince(Date.now()) + " ago",
        friends:[],
        isFriend: false,
    });
    const [personal, setPersonal] = useState(false);
    const [friendState, setFriendState] = useState({
        addingFriend: false,
        removingFriend: false
    });
    const logout = () =>{
        axios.post('/auth/logout')
        .then(res =>{
            setUser("");
            enqueueSnackbar("Successfully logged out!", { variant : "success" });
            props.history.push("/");
        })
        .catch(err =>{
            enqueueSnackbar(`${err.response.status} Internal Server Error`, { variant : "error" });
        })
    }
    useEffect(() =>{
        const { name } = props.match.params;
        if(name === undefined){
            if(myUser !== ""){
                let d = new Date(myUser.joinedAt);
                let j = timeSince(d);
                setProfile({...myUser, joinedAt : j + " ago"});
                setPersonal(true);
            } else {
                enqueueSnackbar("You need to login first !", { variant : "warning" });
                props.history.push("/login");
            }
        }
        else if(name === myUser.username){
            let d = new Date(myUser.joinedAt);
            let j = timeSince(d);
            setProfile({...myUser, joinedAt : j + " ago"});
            setPersonal(true);
        } else {
            axios.get(`/auth/getUser/${name}`)
            .then(req =>{
                const { user, status } = req.data;
                if(status === 404){
                    enqueueSnackbar("User Not Found!", { variant : "error" });
                    props.history.push("/");
                } else {
                    let d = new Date(user.joinedAt);
                    let j = timeSince(d);
                    let findfriend = undefined;
                    if(myUser !== "") findfriend = myUser.friends.find((id) => id === user._id);
                    const isFriend = (findfriend !== undefined);
                    setProfile({...user, joinedAt : j + " ago", isFriend });
                }
            })
            .catch(err =>{
                const { status } = err.response;
                enqueueSnackbar(`${status} : Internal Server Error !`, { variant : "error" });
                props.history.push("/");
            })
        }
    }, []);
    const addFriend = () =>{
        if(!friendState.addingFriend){
            setFriendState({...friendState, addingFriend : true});
            axios.post('/profile/addfriend', {
                username : profile.username
            }).then(res =>{
                enqueueSnackbar(`${profile.username} added as friend`, { variant : "success" });
                setProfile({...profile, isFriend : true});
                setFriendState({...friendState, addingFriend : false});
            }).catch(err =>{
                console.log(err);
                enqueueSnackbar(`${err.response.status} Internal Server Error`, { variant : "error" });
                setFriendState({...friendState, addingFriend : false});
            })
        }
    }
    const removeFriend = () =>{
        if(!friendState.removingFriend){
            setFriendState({...friendState, removingFriend : true});
            axios.post('/profile/removefriend', {
                username : profile.username
            }).then(res =>{
                enqueueSnackbar(`${profile.username} removed as friend`, { variant : "success" });
                setProfile({...profile, isFriend : false});
                setFriendState({...friendState, removingFriend : false});
            }).catch(err =>{
                console.log(err);
                enqueueSnackbar(`${err.response.status} Internal Server Error`, { variant : "error" });
                setFriendState({...friendState, removingFriend : false});
            })
        }
    }
    return(
        <Parent className="profile">
            <Back />
            <Container className="container">
                <Details>
                    <Avatar>
                        <img src={profile.avatar} alt="User" />
                    </Avatar>
                    <About>
                        <p className="name">{profile.username}<span className="lev">({ResolveLevel(profile.score)[0]})</span></p>
                        <p>Joined : {profile.joinedAt}</p>
                        <p>email : {profile.email === "" ? "N/A" : profile.email}</p>
                        <p>{profile.score < 0 ? "" : `Review score : ${profile.score}`}</p>
                        <p className="friends">
                            Friend of {profile.friends.length} users&nbsp;&nbsp;
                            {(!personal && myUser !== "") ? (
                                <>
                                    {(!profile.isFriend) ? (
                                        <Tooltip title="Add Friend">
                                            <FavoriteBorderIcon
                                                onClick={() => addFriend()}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Remove Friend">
                                            <FavoriteIcon
                                                onClick={() => removeFriend()}
                                            />
                                        </Tooltip>
                                    )}
                                </>
                            ) : ("")}
                        </p>
                    </About>
                </Details>
                <Achievments>
                    <Stats>
                        <h1
                            className="level"
                            style={{
                                    color:ResolveLevel(profile.score)[0] + "1)",
                                    textShadow:`0 0 10px ${ResolveLevel(profile.score)[1]}0.6),
                                    0 0 20px ${ResolveLevel(profile.score)[1]}0.6)`
                            }}
                        >{ResolveLevel(profile.score)[0]}</h1>
                        <p>{profile.score >= 0 ? `Score : ${profile.score}` : ""}</p>
                    </Stats>
                    <Stats>
                        <h1>{profile.reviewedMovies.length}</h1>
                        <p>Movies Reviewed</p>
                    </Stats>
                    <Stats>
                        <h1>{profile.ratedMovies.length}</h1>
                        <p>Movies Rated</p>
                    </Stats>
                    <Stats>
                        <h1>{profile.popularity}</h1>
                        <p>Popularity</p>
                    </Stats>
                </Achievments>
                <Top>
                    <Link to='/'>Samarpan&trade;</Link>
                    <Tooltip title="back">
                        <Button
                            onMouseDown={() => props.history.goBack()}
                        ><ArrowBackIcon /></Button>
                    </Tooltip>
                    {(personal === true) ? (
                        <Buttons>
                            <Tooltip title="logout">
                                <Button onClick={() => logout()} className="logout" >
                                    <ExitToAppIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Edit Profile">
                                <Button>
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                        </Buttons>
                    ) : ("")}
                </Top>
            </Container>
        </Parent>
    )
}

const Profile = (props) =>{
    const Loading = useLoading();
    return(
        (!Loading.user) ? (<Waiting />) : (<Main props={props} />)
    )
}

export default withRouter(Profile);