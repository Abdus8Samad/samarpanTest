import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useUser } from '../Contexts/User';
import { Avatar, Dialog, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material';
import { UserTag } from '../Movie/Movie';
import MyButton from './MyButton';

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

const Parent = styled.div`
    color:rgba(255, 255, 255  0.85) !important;
    *{
        color:rgba(255, 255, 255  0.85) !important;
    }
`;

const SBox = styled(Box)`
	width: 100%;
	display: flex;
	align-items: center;
    span{
        color:white !important;
    }
`;

const RateContainer = styled.div`
    width:90%;
    margin:auto;
    font-size:30px;
    span.rateText{
        margin-left:10px;
    }
    &:hover{
        cursor:pointer;
    }
    ${media(900)}{
        margin-top:20px;
        div.canRate > span{
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

const STextField = styled(TextField)`
    .MuiFilledInput-root:after{
        border-bottom:1px solid white !important;
    }
    *{
        color:rgba(255, 255, 255 ,0.85) !important;
    }
    margin:20px 0 !important;
`;

const ReviewIt = styled.p`
    margin:0;
`;

const HoverRating = ({ title, parentProps, rating, setRating }) => {
    const [value, setValue] = useState(rating);
    const [hover, setHover] = useState(-1);
    const [reviewDialog, setReviewDialog] = useState(false);
    const [review, setReview] = useState("");
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
            const newRating = value;
            if(res.status === 404){
                enqueueSnackbar("Movie Not Found !", { variant : "error" });
                parentProps.history.push("/");
            } else if(res.status === 502) {
                enqueueSnackbar("502: Internal Server Error !", { variant : "error" });
                parentProps.history.push("/");
            } else {
                enqueueSnackbar("Movie Rated Successfully", { variant : "success" });
                setReviewDialog(true);
                setRating(newRating);
            }
        })
    }
    return (
        <Parent className="rating">
            <Dialog
                open={reviewDialog}
                onClose={() => setReviewDialog(false)}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="sm"
                fullWidth={true}
                PaperProps={{
                    style: {
                        background: 'linear-gradient(0deg, rgba(27,27,27,1) 10%, rgba(18,18,18,1) 100%)',
                        color: 'rgba(255, 255, 255, 0.85)',
                        outline:'1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius:'10px',
                        outlineOffset:'-6px'
                    },
                }}
            >
                <DialogTitle>
                    <ReviewIt>Review it!</ReviewIt>
                </DialogTitle>
                <DialogContent>
                    <UserTag style={{"lineHeight":"20px"}}>
                        <div>
                            <Avatar alt={user.username} src={user.avatar} />
                        </div>
                        <div>
                            <span className="name">{user.username}</span><br />
                            <span className="dir" style={{"fontSize":"10px", "opacity":"0.75"}}>rated {rating} stars</span>
                        </div>
                    </UserTag>
                    <STextField
                        id="filled-multiline-flexible"
                        label="Write Here"
                        multiline
                        maxRows={6}
                        value={review}
                        fullWidth
                        onChange={(e, val) => setReview(val)}
                        variant="filled"
                    />
                    <MyButton
                        to=""
                        button={true}
                        back="none"
                        color="white" 
                        label='Review it'
                        size="20vw"
                        target="_blank"
                        sx={`
                            margin:auto;
                        `}
                        isborder="true"
                    />
                </DialogContent>
            </Dialog>
            <SBox
                onClick={user === null || user === "" ? login : ""}
            >
                {user === "" ?
                    (
                        <Tooltip title="You have to login first !" placement="bottom-start">
                            <RateContainer>
                                <Rating
                                    name="disabled"
                                    value={10}
                                    max={10}
                                    disabled
                                    emptyIcon={<StarIcon style={{"color":"black"}} />}
                                />
                            </RateContainer>
                        </Tooltip>
                    )
                    : 
                    (
                        <RateContainer className="canRate">
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
                                    emptyIcon={<StarIcon style={{"color":"rgba(255, 255, 255, 0.3)"}} />}
                                />
                            </span>
                            <span className="rateText">{labels[hover !== -1 ? hover : value]}</span>
                        </RateContainer>
                    )
                }
            </SBox>
        </Parent>
    );
}

export default HoverRating;