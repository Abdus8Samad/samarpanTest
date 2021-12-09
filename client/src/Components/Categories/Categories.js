import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import dummyData from '../global/dummyData';


const Parent = styled.div`

`;

const Categories = (props) =>{
    const [movies, setMovies] = useState(dummyData);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
        axios.get(`/movie/getGenre/${props.match.params.name}`)
        .then(res =>{
            setMovies(res.data.movies);
        })
        .catch(err =>{
            let status = "";
            if(err.response){
                status = err.response.status;
            }
            enqueueSnackbar(`${status} Internal server error`, { variant: 'error'});
        })
    }, []);
    return(
        <Parent>
            {movies.map((movie, index) =>{
                return(
                    <div key={index}>
                        <p>{movie.title}</p>
                    </div>
                )
            })}
        </Parent>
    )
}

export default Categories;