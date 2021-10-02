import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

const Alert = (msg, variant) =>{
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
        enqueueSnackbar(msg, { variant });
    }, [])
    return(
        ""
    )
}

export default Alert;