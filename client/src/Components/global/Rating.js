import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useSnackbar } from 'notistack';
import axios from 'axios';

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

const HoverRating = ({ title, parentProps, user }) => {
    const [value, setValue] = useState(4);
    const [hover, setHover] = useState(-1);
    const { enqueueSnackbar } = useSnackbar();
    const login = () =>{
        enqueueSnackbar("Login First !", { variant: "warning" });
        parentProps.history.push("/login");
    }
    const Rate = () =>{
        setValue(hover);
        axios.post('/rate', { value, title })
        .then()
    }
    return (
        <SBox
            onClick={user === "" ? login : ""}
        >
            {user === "" ?
                <Rating
                    name="disabled"
                    value={2}
                    max={10}
                    disabled
                    emptyIcon={<StarIcon style={{"color":"black"}} />}
                /> : 
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