import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import styled from 'styled-components';
import Waiting from '../global/Waiting';
import { withRouter } from 'react-router';

const Parent = styled.div`

`;

const Main = ({ movie }) =>{
    return(
        <Parent>
            <p>{movie.longTitle}</p>
        </Parent>
    )
}

const Movie = (props) =>{
    const [movie, setMovie] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
        console.log("sdf");
        const { name } = props.match.params;
        axios.get(`/getMovie/${name}`)
        .then(res =>{
            const { status, movie } = res.data;
            if(status === 404){
                enqueueSnackbar("Movie not found !", { variant : "error" });
                props.history.goBack();
            } else if(status === 500){
                enqueueSnackbar("Internal server error !", { variant : "error" });
                props.history.goBack();
            } else {
                setMovie(movie);
            }
        })
        .catch(err =>{
            console.log(err);
            enqueueSnackbar("Some error ocurred !", { variant : "error" });
            props.history.goBack();
        })
    }, [])
    return(
        (movie === "") ? (<Waiting />) : (
            <Main 
                movie={movie}
            />
        )
    )
}

export default withRouter(Movie);