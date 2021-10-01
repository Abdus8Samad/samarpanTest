import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled from 'styled-components';
import { useSetUser, useUser } from "../Contexts/User";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from "notistack";
import timeSince from "../global/TimeSince";
import ResolveLevel from "../global/ResolveLevel";
import { Helmet } from "react-helmet";

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    position:fixed;
    z-index:-20;
    height:100vh;
    width:100vw;
    overflow-y:scroll;
    background:radial-gradient(circle, rgba(26,26,26,1) 0%, rgba(18,18,18,1) 100%) no-repeat;
    background-attachment:fixed;
    color:rgba(255, 255, 255, 0.85);
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
    padding:20px;
    min-height:90vh;
    background:radial-gradient(circle, rgba(26,26,26,1) 0%, rgba(18,18,18,1) 100%) no-repeat;
    margin:auto;
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
    ${media(600)}{
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
    margin-top:70px;
    background:rgba(40, 40, 40, 1);
    justify-content:center;
    border-radius:20px;
    div{
        text-align:center;
        padding:0 6%;
    }
    ${media(600)}{
        font-size:smaller;
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
`;

const Top = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:99vw;
`;

const Profile = (props) =>{
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
        friends:[]
    });
    const [personal, setPersonal] = useState(false);
    const logout = () =>{
        axios.post('/logout')
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
            setPersonal(true);
            setProfile(myUser);
        }
        else if(name === "") props.history.push("/");
        else if(name === myUser.username){
            let d = new Date(myUser.joinedAt);
            let j = timeSince(d);
            setPersonal(true);
            setProfile({...myUser, joinedAt : j + " ago"});
        } else {
            axios.get(`/getUser/${name}`)
            .then(req =>{
                const { user, status } = req.data;
                if(status === 404){
                    props.history.push("/");
                    enqueueSnackbar("User Not Found!", { variant : "error" });
                } else {
                    let d = new Date(user.joinedAt);
                    let j = timeSince(d);
                    setProfile({...user, joinedAt : j + " ago"});
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
        <Parent className="profile">
            <Helmet><title>Profile - {profile.username}...</title></Helmet>
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
                        <p>Friend of {profile.friends.length} users</p>
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
                    <Button
                        onMouseDown={() => props.history.goBack()}
                    ><ArrowBackIcon /></Button>
                    {(personal === true) ? (
                        <Buttons>
                            <Button onClick={() => logout()} className="logout">
                                <ExitToAppIcon />
                            </Button>
                            <Button>
                                <EditIcon />
                            </Button>
                        </Buttons>
                    ) : ("")}
                </Top>
            </Container>
        </Parent>
    )
}

export default withRouter(Profile);