import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import styled from 'styled-components';
import { useSetAlert } from "../Contexts/Alerts";
import { useSetUser, useUser } from "../Contexts/User";

const Parent = styled.div`
    background:#121212;
`;

const Logout = styled.div`
    background:rgba(255, 0, 0, 0.8);
    font-size:20px;
    padding:6px;
    width:100px;
`;

const Profile = (props) =>{
    const setAlert = useSetAlert();
    const setUser = useSetUser();
    const User = useUser();
    const logout = () =>{
        axios.post('/logout')
        .then(res =>{
            setUser("");            
            setAlert(['success', "Successfully logged out!"]);
            props.history.push("/");
        })
        .catch(err =>{
            setAlert(["error", `${err.response.status} Internal Server Error`]);
        })
    }
    return(
        <Parent>
            <img src={User.avatar} alt="User" />
            <p>{User.username}</p>
            <Logout onClick={() => logout()}>Logout</Logout>
        </Parent>
    )
}

export default withRouter(Profile);