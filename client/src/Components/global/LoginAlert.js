import react, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Redirect } from 'react-router';

const LoginAlert = () =>{
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
        enqueueSnackbar("401: Please Login First !", { variant : "warning" });
    })
    return(
        <Redirect to='/login' />
    )
}

export default LoginAlert;