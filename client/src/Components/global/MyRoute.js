import { useSnackbar } from 'notistack';
import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import { useUser } from '../Contexts/User';

const MyRoute = (attr) =>{
    const User = useUser();
    const { enqueueSnackbar } = useSnackbar();
    return(
        <Route exact {...attr}>
            {() =>{
                const {
                    name,
                    component
                } = attr;
                const protectedRoutes = {
                    editprofile: 1,
                    myprofile: 1,
                }
                let loggedIn = (User !== "");
                if(!loggedIn && protectedRoutes[name] === 1){
                    enqueueSnackbar("You need to login first !", { variant : "warning" });
                    return <Redirect to='/login' />
                }
                return component;
            }}
        </Route>
    )
}

export default withRouter(MyRoute);