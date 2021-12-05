import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled from 'styled-components';
import { useSetUser, useUser } from "../Contexts/User";
import { useSnackbar } from "notistack";
import timeSince from "../utils/TimeSince";
import { ResolveLevel } from "../utils/ResolveLevel";
import { Avatar, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLoading } from "../Contexts/LoadingState";
import { Link } from "react-router-dom";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Waiting from "../global/Waiting";

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    color:rgba(255, 255, 255, 0.85);
`;

export const Back = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index:-20;
    height:100vh;
    width:100vw;
    background: rgb(27,27,27);
    background: linear-gradient(0deg, rgba(27,27,27,1) 10%, rgba(18,18,18,1) 100%);
    background-attachment:fixed;
`;

const SAvatar = styled(Avatar)`
    position:relative;
    margin:20px auto;
    &::after{
        content:'';
        width:100%;
        height:100%;
        position:absolute;
        z-index:50;
        left:0;
        top:0;
        border-radius:50%;
        background:rgba(0, 0, 0, 0.4);
        opacity:0;
        transition:all 0.2s ease;
    }
    &:hover{
        cursor:${props => props.personal ? "pointer" : "initial"};
        &::after, svg{
            opacity:${props => props.personal ? 1 : 0};
        }
    }
    svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        z-index:100;
        opacity:0;
    }
    ${media(600)}{
        min-height:0;
    }
`;

const Img = styled.img`
    width:23vw;
    height:23vw;
    min-width:120px;
    border-radius:50%;
`;

const Container = styled.div`
    position:relative;
    width:90vw;
    padding:10px 10px 0 10px;
    min-height:90vh;
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
    div:not(.avatar){
        width:50%;
    }
    justify-content:space-around:
    align-items:center;
    position:relative;
    top:40px;
    ${media(700)}{
        display:block;
        div:not(.avatar){
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
        padding:0 3.5%;
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

export const Button = styled.div`
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

export const Top = styled.div`
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

const Main = ({ props, profile, setProfile, personal, myUser }) =>{
    const { enqueueSnackbar } = useSnackbar();
    const setUser = useSetUser();
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
    const addFriend = () =>{
        if(!friendState.addingFriend){
            setFriendState({...friendState, addingFriend : true});
            axios.post('/profile/addfriend', {
                username : profile.username
            }).then(res =>{
                const { user } = res.data;
                enqueueSnackbar(`${profile.username} added as friend`, { variant : "success" });
                setProfile({...profile, isFriend : true});
                setUser(user);
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
                const { user } = res.data;
                enqueueSnackbar(`${profile.username} removed as friend`, { variant : "success" });
                setProfile({...profile, isFriend : false});
                setUser(user);
                setFriendState({...friendState, removingFriend : false});
            }).catch(err =>{
                console.log(err);
                enqueueSnackbar(`${err.response.status} Internal Server Error`, { variant : "error" });
                setFriendState({...friendState, removingFriend : false});
            })
        }
    }
    const setFile = ({target}) =>{
        const validTypes = ["jpeg", "png", "jpg", "gif", "jfif", "pjpeg", "pjp"];
        const file = target.files[0], fileType = file.type, fileSize = file.size, reader = new FileReader();
        const tenMB = 10485760; // bytes;
        if(validTypes.indexOf(fileType.substr(6)) === -1){
            target.value = "";
            enqueueSnackbar("Please upload only valid images", { variant : "warning" });
        } else if(fileSize > tenMB) {
            target.value = "";
            enqueueSnackbar("Avatar size limit of 10MB exceeded", { variant : "warning" });
        } else {
            reader.addEventListener('load', () =>{
                axios.post(`/profile/${profile.username}/edit`, { avatar: reader.result })
                .then(res =>{
                    const { status } = res.data;
                    if(status !== 200){
                        console.log(res.data.msg);
                    } else {
                        profile.avatar = reader.result;
                        setUser(profile);
                        enqueueSnackbar("Updated Avatar Successfully !", { variant : "success" });
                    }
                })
            }, false);
            if(file){
                // Will trigger load when loaded with result -> file's data in base64 encoding
                reader.readAsDataURL(file);
            }
        }
    }
    const uploadAvatar = () =>{
        if(personal){
            const input = document.querySelector("input[type='file']");
            input.click();
        }
    }
    return(
        <Parent className="profile">
            <Back />
            <Container className="container">
                <Details>
                    <div>
                        <SAvatar
                            personal={personal}
                            onClick={() => uploadAvatar()}
                            className="avatar"
                            sx={{width:"23vw", height:"23vw"}}
                            // style={{background:`#313131 url(${profile.avatar}) no-repeat fixed top center`}}
                        >
                            <CameraAltOutlinedIcon />
                            <Img src={profile.avatar} alt="User" />
                            <input
                                id="upload-photo"
                                name="avatar"
                                type="file"
                                onChange={(e) => setFile(e)}
                                accept="image/jpeg, image/jpg, image/gif, image/png"
                                title="Please upload only images"
                                hidden
                            />
                        </SAvatar>
                    </div>
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
                        </Buttons>
                    ) : ("")}
                </Top>
            </Container>
        </Parent>
    )
}

const Profile = (props) =>{
    const Loading = useLoading();
    const myUser = useUser();
    const { enqueueSnackbar } = useSnackbar();
    const [personal, setPersonal] = useState(false);
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
    return(
        (!Loading.user || profile.popularity === "0%" ) ? (<Waiting open={true} />) : (
            <Main
                props={props}
                profile={profile}
                setProfile={() => setProfile()}
                personal={personal}
                myUser={myUser}
            />
        )
    )
}

export default withRouter(Profile);