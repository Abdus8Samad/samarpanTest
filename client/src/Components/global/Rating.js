import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useUser } from '../Contexts/User';
import { Tooltip } from '@mui/material';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const labels = {
    0: 'No Rating Given',
    0.5: 'Worse / 0.5',
    1: 'Worse+ / 1',
    1.5: 'Poor / 1.5',
    2: 'Poor+ / 2',
    2.5: 'Bad / 2.5',
    3: 'Bad+ / 3',
    3.5:'Fair / 3.5',
    4: 'Fair+ / 4',
    4.5: 'Not Bad / 4.5',
    5: 'Not Bad+ / 5',
    5.5: 'Good / 5.5',
    6: 'Good+ / 6',
    6.5: 'Great / 6.5',
    7: 'Great+ / 7',
    7.5: 'Excellent / 7.5',
    8: 'Excellent+ / 8',
    8.5: 'Marvelous / 8.5',
    9: 'Marvelous+ / 9',
    9.5: 'Masterpiece / 9.5',
    10: 'Masterpiece+ / 10'
};

const SBox = styled(Box)`
	width: 100%;
	display: flex;
	align-items: center;
    span{
        color:white !important;
    }
`;

const CanRate = styled.div`
    width:90%;
    margin:auto;
    font-size:30px;
    span.rateText{
        margin-left:10px;
    }
    ${media(900)}{
        margin-top:20px;
        & > span{
            width:fit-content;
            display:block !important;
            margin:auto;
        }
        span.rateText{
            margin:50px auto 0 auto;
        }
        *{
            font-size:35px !important;
        }
    }
    ${media(700)}{
        *{
            font-size:24px !important;
        }
    }
`;

const HoverRating = ({ title, parentProps, rating }) => {
    const [value, setValue] = useState(rating);
    const [hover, setHover] = useState(-1);
    const user = useUser();
    const { enqueueSnackbar } = useSnackbar();
    const login = () =>{
        enqueueSnackbar("Login First !", { variant: "warning" });
        parentProps.history.push("/login");
    }
    const Rate = () =>{
        setValue(hover);
        axios.post(`/movie/${title}/rate`, { rate: value, title })
        .then(res =>{
            if(res.status === 404){
                enqueueSnackbar("Movie Not Found !", { variant : "error" });
                parentProps.history.push("/");
            } else if(res.status === 502) {
                enqueueSnackbar("502: Internal Server Error !", { variant : "error" });
                parentProps.history.push("/");
            } else {
                enqueueSnackbar("Movie Rated Successfully", { variant : "success" });
            }
        })
    }
    return (
        <SBox
            onClick={user === null || user === "" ? login : ""}
        >
            {user === "" ?
                (
                    <Tooltip title="Please Login">
                        <Rating
                            name="disabled"
                            value={10}
                            max={10}
                            disabled
                            emptyIcon={<StarIcon style={{"color":"black"}} />}
                        />
                    </Tooltip>
                )
                 : 
                <CanRate>
                    <span>
                        <Rating
                            name="hover-feedback"
                            value={value}
                            max={10}
                            precision={0.5}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            onClick={() => Rate()}
                            emptyIcon={<StarIcon style={{"color":"rgba(0, 0, 0, 0.55)"}} />}
                        />
                    </span>
                    <span className="rateText">{labels[hover !== -1 ? hover : value]}</span>
                </CanRate>
            }
        </SBox>
    );
}

export default HoverRating;