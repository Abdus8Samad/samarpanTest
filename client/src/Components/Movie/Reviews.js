import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { SmallHeading } from '../global/styles';
import ReactTextCollapse from 'react-text-collapse';
import timeSince from '../utils/TimeSince';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import MyButton from '../global/MyButton';
import { useUser } from '../Contexts/User';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    p.top{
        margin:auto;
        width:60%;
        padding-bottom:23px;
        font-size:70px;
        text-align:center;
        border-bottom:1.4px solid rgba(255, 255, 255, 0.6);
    }
    ${media(700)}{
        p.top{
            font-size:45px;
        }
    }
    ${media(500)}{
        p.top{
            width:80%;
            font-size:35px;
        }
    }
`;

const Container = styled.div`
    width: 91%;
    overflow: hidden;
    margin:auto;
    padding: 80px 0;
    #two:checked ~ .mainCard{
        margin-left: -100%;
    }
    #one:checked ~ .button .one{
        width: 35px;
    }
    #one:checked ~ .button .two{
        width: 15px;
    }
    #two:checked ~ .button .one{
        width: 15px;
    }
    #two:checked ~ .button .two{
        width: 35px;
    }
    input[type="radio"]{
        display: none;
    }
`;

const MainCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200%;
    transition: 1s;
`;

const Cards = styled.div`
    width: calc(100% / 2 - 10px);
    display: flex;
    flex-wrap: wrap;
	gap:25px 10px;
    margin: 0 20px;
    justify-content: space-around;
    align-items:stretch;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px;
    label{
        height: 15px;
        width: 15px;
        border-radius: 20px;
        background: #fff;
        margin: 25px 4px;
        cursor: pointer;
        transition: all 0.5s ease;      
    }
    label.active{
        width: 35px;
    }
`;

const SCard = styled(Card)`
	width: calc(100% / 3 - 10px);
	background-color:rgba(60, 60, 60, 0.1) !important;
	box-shadow:0 0 15px rgba(255, 255, 255, 0.1) !important;
	border-radius:13px !important;
    height:fit-content !important;
	transition:all 0.35s ease !important;
	*{
		color: rgba(255, 255, 255, 0.85) !important;
	}
	&:hover{
		transform:translateY(-15px);
		cursor:pointer;
	}
	${media(900)}{
		width: calc(100% / 2 - 10px);
	}
	${media(700)}{
		width: 100%;
	}
`;

const DialogCard = styled(Card)`
    margin:auto;
    z-index:10001;
	width:100%;
    min-width:250px;
    overflow:scroll !important;
	background-color:rgba(40, 40, 40, 1) !important;
	box-shadow:0 0 15px rgba(255, 255, 255, 0.1) !important;
	border-radius:13px !important;
	*{
		color: rgba(255, 255, 255, 0.85) !important;
	}
`;

const TopReviews = styled.div``;
const OtherReviews = styled.div`
    width:98%;
    padding:0 0 100px 25px;
`;

const SList = styled(List)`
    *{
        color:rgba(255, 255, 255, 0.65) !important;
    }
`;

const SFormControl = styled(FormControl)`
    width:30% !important;
    min-width:150px !important;
    *{
        border-color:rgba(255, 255, 255 ,0.85) !important;
    }
    *{
        color:rgba(255, 255, 255 ,0.85) !important;
    }
`;

const SToggleButtonGroup = styled(ToggleButtonGroup)`
    *{
        color:rgba(255, 255, 255, 0.85) !important;
    }
`;

const SortData = styled.div`
    margin:50px 0 10px 0;
    width:100%;
    justify-content:space-between;
    display: flex;
`;

const WriteReview = styled.div`
    width:65%;
    margin:auto;
    .MuiFilledInput-root:after{
        border-bottom:1px solid white !important;
    }
    *{
        color:rgba(255, 255, 255 ,0.85) !important;
    }
`;

const Reviews = ({ parentProps, movie }) =>{
	const [isModal, setModal] = useState([false, -1]);
    const [reviews, setReviews] = useState(movie.reviews);
    const [orderBy, setOrderBy] = useState("Latest");
    const [review, setReview] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const user = useUser();
    const DateAsc = (a, b) =>{
        console.log("DateAsc");
        a = new Date(a.date).getMilliseconds();
        b = new Date(b.date).getMilliseconds();
        return a - b;
    }
    const DateDesc = (a, b) => {
        console.log("DateDesc");
        return -1 * DateAsc(a, b);
    }
    // const LikesAsc = (a, b) => a.likes - b.likes;
    const LikesDesc = (a, b) => {
        console.log(a, b);
        return b.likes - a.likes;
    }
    const Sortings = {
        Latest:{
            load: DateAsc
        },
        Oldest:{
            load: DateDesc
        },
        Popularity:{
            load: LikesDesc
        }
    }
    const handleSortingOrderBy = (event) =>{
        event.preventDefault();
        const newValue = event.target.value;
        setOrderBy(newValue);
        setReviews(reviews.sort(Sortings[newValue]).load);
    }
    const Review = () =>{
        axios.post(`/movie/${movie.title}/review`, { review })
        .then(res =>{
            const { status } = res.data;
            if(status === 401) {
                enqueueSnackbar('401: Please Login First !', { variant: "warning" });
                parentProps.history.push("/login");
            } else if(status === 404) {
                enqueueSnackbar("Movie Not Found !", { variant : "error" });
                parentProps.history.goBack();
            } else if(status === 502) {
                enqueueSnackbar("502: Internal Server Error !", { variant : "error" });
            } else {
                enqueueSnackbar("Review Added Successfully !", { variant : 'success' });
                setModal([false, -1]);
            }
        })
        .catch(err =>{
            if(err.response){
                enqueueSnackbar(`${err.response.status}: Internal Server Error`, { variant : 'error' });
            }
        })
    }
    return(
        <Parent>
            <TopReviews>
                <p className="top scrollEffect">Top Reviews</p>
                <Container className="scrollEffect">
                    <input type="radio" name="dot" id="one" />
                    <input type="radio" name="dot" id="two" />
                    <MainCard className="mainCard">
                        {
                            // (movie.reviews.sort(Sortings["Popularity"].load).slice(0, 6).reduce((r, e, i) =>{
                            (movie.reviews.slice(0, 6).reduce((r, e, i) =>{
                                return(
                                    ((i % 3) ? r[r.length - 1].push(e) : r.push([e])) && r
                                )
                            }, [])).map((group, index) =>
                                <Cards key={uuidv4()}>
                                    {
                                        group.map((review, index) =>
                                            <>
                                                <SCard onClick={() => setModal([true, movie.reviews.indexOf(review)])} key={uuidv4()}>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar alt="avatar" src={review.avatar} />
                                                        }
                                                        action={
                                                            <IconButton aria-label="settings">
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        }
                                                        title={review.author}
                                                        subheader={timeSince(review.date) + " ago"}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {
                                                                (review.body.length < 240) ? 
                                                                    (review.body) : 
                                                                    (review.body.substr(0, 240) + "...")
                                                            }
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <IconButton aria-label="add to favorites">
                                                            <FavoriteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="share">
                                                            <ShareIcon />
                                                        </IconButton>
                                                    </CardActions>
                                                </SCard>
                                                <Dialog
                                                    open={isModal[0] && movie.reviews.indexOf(review) === isModal[1]}
                                                    onClose={() => setModal([false, -1])}
                                                    scroll={"paper"}
                                                    aria-labelledby="scroll-dialog-title"
                                                    aria-describedby="scroll-dialog-description"
                                                    maxWidth="md"
                                                    PaperProps={{
                                                        style: {
                                                            backgroundColor: 'transparent'
                                                        },
                                                    }}
                                                >
                                                    <DialogCard>
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar alt="avatar" src={review.avatar} />
                                                            }
                                                            action={
                                                                <IconButton aria-label="settings">
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                            }
                                                            title={review.author}
                                                            subheader="September 14, 2016"
                                                        />
                                                            <DialogContent dividers={true}>
                                                            {/* <CardContent> */}
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {review.body}
                                                                </Typography>
                                                            {/* </CardContent> */}
                                                            </DialogContent>
                                                            <CardActions disableSpacing>
                                                                <IconButton aria-label="add to favorites">
                                                                    <FavoriteIcon />
                                                                </IconButton>
                                                                <IconButton aria-label="share">
                                                                    <ShareIcon />
                                                                </IconButton>
                                                            </CardActions>
                                                    </DialogCard>
                                                </Dialog>
                                            </>
                                        )
                                    }
                                </Cards>
                            )
                        }
                    </MainCard>
                    <Buttons className="button">
                        <label htmlFor="one" className="active one"></label>
                        <label htmlFor="two" className="two"></label>
                    </Buttons>
                </Container>
            </TopReviews>
            <OtherReviews>
                <SmallHeading text="All Reviews" />
                <SortData>
                    <SFormControl fullWidth className="formControlWala">
                        <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderBy}
                            label="SortBy"
                            onChange={handleSortingOrderBy}
                        >
                            <MenuItem value={"Latest"}>Latest</MenuItem>
                            <MenuItem value={"Oldest"}>Oldest</MenuItem>
                            <MenuItem value={"Popularity"}>Popularity</MenuItem>
                        </Select>
                    </SFormControl>
                </SortData>
                <SList>
                    {reviews.map((review, index) =>{
                        return(
                            <>
                            <ListItem alignItems="flex-start" key={index}>
                                <ListItemAvatar>
                                <Avatar alt={review.author} src={review.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={review.author}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {timeSince(review.date)} ago<br />
                                            </Typography>
                                            <ReactTextCollapse
                                                options={{
                                                    collapse: false, // default state when component rendered
                                                    collapseText: '... show more', // text to show when collapsed
                                                    expandText: 'show less', // tex0 to show when expanded
                                                    minHeight: 40, // component height when closed
                                                    maxHeight: 140,  // expanded to
                                                    textStyle: { // pass the css for the collapseText and expandText here
                                                      color: "blue",
                                                      fontSize: "20px"
                                                    }
                                                }}
                                            >
                                                {review.body}
                                            </ReactTextCollapse>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {index < (movie.reviews.length - 1) && <Divider light variant="inset" component="li" />}
                        </>
                        )
                    })}
                </SList>
                <WriteReview>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Write Your Review"
                        multiline
                        minRows={6}
                        value={review}
                        fullWidth
                        variant="filled"
                        onChange={(e) => setReview(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <MyButton
                        button={true}
                        back="none"
                        color="white"
                        label='Review it'
                        size="20vw"
                        sx={`
                            margin:20px auto 0 auto;
                        `}
                        isborder="true"
                        onClick={() => Review()}
                    />
                </WriteReview>
            </OtherReviews>
        </Parent>
    )
}

export default Reviews;