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
	font-size: 30px;
	${media(550)}{
		font-size:20px;
		*{
			font-size:20px !important;
		}
	}
    ${media(400)}{
		font-size:15px;
		*{
			font-size:15px !important;
		}
	}
`;

const HoverRating = ({ parentProps, user }) => {
    const [value, setValue] = useState(4);
    const [hover, setHover] = useState(-1);
    const { enqueueSnackbar } = useSnackbar();
    const login = () =>{
        enqueueSnackbar("Login First !", { variant: "warning" });
        parentProps.history.push("/login");
    }
    const Rate = () =>{
        setValue(hover);
        axios.post('/rate', { value })
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
                    style={{"fontSize":"30px","color":"white"}}
                    emptyIcon={<StarIcon style={{"fontSize":"30px","color":"black"}} />}
                /> : 
                <>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        max={10}
                        precision={0.5}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        onClick={() => Rate()}
                        style={{"fontSize":"30px","color":"white"}}
                        emptyIcon={<StarIcon style={{"fontSize":"30px","color":"rgba(0, 0, 0, 0.55)"}} />}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </>
            }
        </SBox>
    );
}

export default HoverRating;