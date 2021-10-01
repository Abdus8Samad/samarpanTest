import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useUser, useSetUser } from '../Contexts/User';
const Parent = styled.div`

`;

const EditProfile = (props) =>{
    const User = useUser();
    const setUser = useSetUser();
    return(
        <Parent>
            <Helmet><title>Edit - {User.username}</title></Helmet>
            <p>Edit Profile</p>
        </Parent>
    )
}

export default EditProfile;