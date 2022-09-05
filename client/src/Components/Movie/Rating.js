import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useMisc } from '../Contexts/misc';
import { Avatar, Dialog, DialogContent, DialogTitle, TextField, Tooltip, Typography } from '@mui/material';
import { UserTag } from './Movie';
import MyButton from '../global/MyButton';

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
    margin:25px auto;
    span.rateText{
        margin-left:10px;
    }
    *{
        font-size:30px !important;
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
    }
    ${media(700)}{
        *{
            font-size:24px !important;
        }
    }
`;

const STextField = styled.div`
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

const HoverRating = ({ movie, title, parentProps }) => {
    const [hover, setHover] = useState(-1);
    const [reviewDialog, setReviewDialog] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const { user } = useMisc();
    const { enqueueSnackbar } = useSnackbar();
    const login = () =>{
        enqueueSnackbar("401: Please Login First !", { variant: "warning" });
        parentProps.history.push("/login");
    }
    const Rate = (rate) =>{
        axios.post(`/movie/${title}/rate`, { rate })
        .then(res =>{
            const { status } = res.data;
            if(status === 404){
                enqueueSnackbar("Movie Not Found !", { variant : "error" });
                parentProps.history.goBack();
            } else if(status === 401) {
                enqueueSnackbar('401: Please Login First !', { variant: "warning" });
                parentProps.history.push("/login");
            } else if(status === 502) {
                enqueueSnackbar("502: Internal Server Error !", { variant : "error" });
            } else {
                enqueueSnackbar("Movie Rated Successfully", { variant : "success" });
                let reviewed = movie.reviews.find(review => review.author === user.username);
                if(reviewed !== undefined){
                    setReview(reviewed.body);
                }
                setReviewDialog(true);
            }
        })
        .catch(err =>{
            console.log(err);
            if(err.response){
                enqueueSnackbar(`${err.response.status} Server Not Responding !`, { variant : "error" });
            }
        })
    }
    const Review = () =>{
        axios.post(`/movie/${title}/review`, { review })
        .then(res =>{
            const { status } = res.data;
            if(status === 404){
                enqueueSnackbar("Movie Not Found !", { variant : "error" });
                parentProps.history.goBack();
            } else if(status === 502) {
                enqueueSnackbar("502: Internal Server Error !", { variant : "error" });
            } else {
                setReviewDialog(false);
                enqueueSnackbar("Review Added Successfully !", { variant : 'success' });
            }
        })
        .catch(err =>{
            console.log(err);
            enqueueSnackbar(`${err.statusCode}: Internal Server Error`, { variant : 'error' });
        })
    }
    useEffect(() =>{
        if(user !== ""){
            let userRating;
            if(user.isCritic){
                userRating = movie.ratedBy.critics.find(review => review.user.toString() === user._id.toString());
            } else {
                userRating = movie.ratedBy.users.find(review => review.user.toString() === user._id.toString());
            }
            if(userRating !== undefined) setRating(userRating.rating);
        }
    }, [])
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
                    <STextField>
                        <TextField
                            id="filled-multiline-flexible"
                            label="Write Here"
                            multiline
                            maxRows={6}
                            value={review}
                            fullWidth
                            variant="filled"
                            onChange={(e) => setReview(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </STextField>
                    <MyButton
                        button={true}
                        back="none"
                        color="white"
                        label='Review it'
                        size="20vw"
                        sx={`
                            margin:auto;
                        `}
                        isborder="true"
                        onClick={() => Review()}
                    />
                </DialogContent>
            </Dialog>
            <SBox
                onClick={user === null || user === "" ? login : null}
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
                        <RateContainer>
                            <span>
                                <Typography component="legend">{labels[hover !== -1 ? hover : rating]}</Typography>
                                <Rating
                                    className="ratingWala"
                                    name="hover-feedback"
                                    value={rating}
                                    max={10}
                                    precision={0.5}
                                    onChange={(event, newValue) =>{
                                        setRating(newValue);
                                        Rate(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{"color":"rgba(255, 255, 255, 0.3)"}} />}
                                />
                            </span>
                            {/* <span className="rateText">{labels[hover !== -1 ? hover : value]}</span> */}
                        </RateContainer>
                    )
                }
            </SBox>
        </Parent>
    );
}

export default HoverRating;