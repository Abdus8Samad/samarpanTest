import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import styled from 'styled-components';
import Waiting from '../global/Waiting';
import { withRouter } from 'react-router';
import { Avatar, Backdrop, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, Fade, IconButton, Modal, Tooltip, Typography } from '@mui/material';
import { Button } from '../Profile/Profile';
import { SmallHeading } from '../global/styles';
import { Link } from 'react-router-dom';
import { ScoreLevel } from '../utils/ResolveLevel';
import MyButton from '../global/MyButton';
import HoverRating from '../global/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import demonslayerwall from '../images/demonSlayerWall.png';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const dummyData = [
    {
        title:"The Suicide Squad(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BMjM1OTMxNzUyM15BMl5BanBnXkFtZTgwNjYzMTIzOTE@._V1_.jpg",
    },
    {
        title:"Venom(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_.jpg",
    },
    {
        title:"Cindrella(2021)",
        src:"https://m.media-amazon.com/images/M/MV5BZTk3ZTEzNGUtZTcwYy00NmRmLWFhMGYtZjA4NWY1ZWI4MzMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    },
    {
        title:"Peaky Blinders",
        src:"https://cdn.shopify.com/s/files/1/0969/9128/products/PeakyBlinders-ThomasShelby-GarrisonBombing-NetflixTVShow-ArtPoster_a29a5be9-9611-43d9-b415-18655f60c629.jpg?v=1619864667",
    },
    {
        title:"No time to die",
        src:"https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
    },
];

const Parent = styled.div`
    color:rgba(255, 255, 255, 0.85);
`;

const TopBox = styled.div`
    background:url('${props => props.back}') no-repeat center fixed;
    background-size:cover;
    min-height:102vh;
    width:100%;
    position:relative;
    margin:0;
    &:after{
        content:'';
        position:absolute;
        width:100%; height:100%;
        z-index:10;
        top:0; left:0;
        background:rgba(0,0,0,0.45);
        opacity:1;
    }
    &:before{
        content:'';
        position:absolute;
        right:0;
        top:0;
        background:rgba(0, 0, 0, 0.4);
        height:100%;
        width:30%;
    }
    ${media(800)}{
        height:fit-content;
        padding-bottom:25px;
        &:before{
            display:none;
        }
    }
`;

const Content = styled.div`
    position:relative;
    z-index:50;
`;

const MainContent = styled.div`
    display:flex;
    letter-spacing:0 !important;
    width:90%;
    margin:auto;
    ${media(800)}{
        display:block;
    }
`;

const MovieInfo = styled.div`
    position:relative;
    width:80%;
    padding-left:30px;
    ${media(800)}{
        width:85vw;
        height:550px;
    }
`;

const MovieCast = styled.div`
    width:20%;
    span.dir{
        color:rgba(255, 255, 255, 0.6);
        font-size:small;
    }
    ${media(800)}{
        margin-top:80px;
        width:100%;
    }
`;

const Img = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
`;

const Director = styled.div`
    display:flex;
    width:100%;
    div:nth-child(2){
        padding-left:9px;
    }
`;

const P = styled.p`
    font-size:25px;
`;

const Cast = styled.div`
    display:flex;
    flex-flow:row wrap;
    gap:20px 10px;
    justify-content:space-between;
`;

const Character = styled(Link)`
    width:40%;
    display:inline-block;
    border-radius:8px;
    color:inherit !important;
    font-size:80%;
    transition:all 0.15s ease;
    span{
        opacity:0.8;
    }
    img{
        border-radius:8px;
        width:100%;
    }
    &:hover{
        transform:scale(1.1);
    }
    ${media(800)}{
        width:20%;
    }
    ${media(500)}{
        width:25%;
    }
`;

const BigTitle = styled.div`
    position:absolute;
    bottom:25px;
    a{
        font-size:20px;
        padding:12px;
    }
    a:nth-child(3){
        margin-left:25px;
    }
    ${media(500)}{
        a{
            font-size:15px;
            padding:10px;    
        }
    }
`;

const Released = styled.p`
    font-size:17px;
    text-transform:uppercase;
    span:first-child{
        opacity:0.6;
    }
    ${media(500)}{
        font-size:12px;
    }
`;

const Title = styled.p`
    word-break:break-all;
    width:80%;
    font-size:40px;
    position:relative;
    &:after{
        content:"";
        position:absolute;
        top:32px;
        right:0;
    }
    ${media(800)}{
        width:100%;
    }
    ${media(500)}{
        font-size:30px;
    }
`;

const Details = styled.div`
    margin:auto;
    display:flex;
    justify-content:space-between;
	padding-bottom:50px;
    ${media(800)}{
        display:block;
    }
`;

const Desc = styled.p`
    font-size:12px;
    position:relative;
    top:-20px;
`;

const StoryLine = styled.div`
`;
    
const Left = styled.div`
    padding-left:25px;
    width:45%;
    ${media(800)}{
        width:98%;
    }
`;
    
// background:rgb(255,220,88);
const Right = styled.div`
    padding-left:30px;
    color:rgba(0, 0, 0, 0.8);
    width:30%;
    background:#FFCC10;
    ${media(800)}{
        width:100%;
        padding-top:2px;
        margin-top:50px;
        padding-bottom:40px;
    }
`;

const Rating = styled.div`
    margin-top:30px;
    p{
        text-align:center;
    }
    p:nth-child(2){
        margin-top:-5px;
        font-size:60px;
        font-weight:Bold;
    }
    p:nth-child(3){
        position:relative;
        top:-35px;
        font-size:15px;
    }
`;

const Genre = styled.span`
    display:inline-block;
    padding:2px;
    margin:2px;
    border-radius:4px;
    color:black;
    background:#FFCC10;
`;

const FullDetails = styled.div`
	margin-top:80px;
	span{
		font-weight:bold;
		color:white;
	}
	a{
		color:white;
		opacity:0.5;
		transition:all 0.2s ease;
		font-style:italic;
	}
	a:hover{
		opacity:0.85;
	}
	p.genre::nth-last-word{
		display:none;
	}
`;

const Score = styled.div`
    margin-top:55px;
	p{
		text-align:center;
		color:${props => props.color};
		font-size:60px;
		font-weight:bold;
	}
`;

const FullCast = styled.div`
    margin-top:80px;
    tr:first-child td:first-child { border-top-left-radius: 20px; }
    tr:first-child td:last-child { border-top-right-radius: 20px; }
    tr:last-child td:first-child { border-bottom-left-radius: 20px; }
    tr:last-child td:last-child { border-bottom-right-radius: 20px; }
    table{
        border-collapse: separate;
        text-align:center;
        margin:30px 20px;
        width:60vw;
    }
    td{
        position:relative;
        padding:10px;
        margin:20px;
        height:fit-content;
        position:relative;
    }
    td.avatar > div{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
    td.avatar{
        padding:30px;
    }
    td.name{
        width:500px;
    }
    td.role{
        width:500px;
    }
    td p{
        text-align:center;
    }
    a{
        color:inherit !important;
    }
    tr{
        transition:all 0.13s ease-in;
        margin-left:30px;
    }
    tr:hover{
        transform:scale(1.1) !important;
        box-shadow:0 0 5px rgba(0, 0, 0, 0.4);
        background:rgba(0, 0, 0, 0.8);
    }
    ${media(800)}{
        table{
            width:80vw;
            margin:50px auto;
        }
    }
    ${media(600)}{
        table{
            font-size:12px;
        }
    }
`;

const More = styled.div`
    margin-top:125px;
`;

const Movies = styled.div`
    display:flex;
    text-align:center;
    flex-flow:row wrap;
    width:100%;
    justify-content:space-around;
    gap:20px 0;
    a{
        border-radius:5px;
        display:block;
        width:26%;
        position:relative;
        color:inherit !important;
        font-size:small;
        transition:all 0.1s ease;
    }
    a:hover{
        transform:scale(1.1);
    }
    img{
        width:100%;
        border-radius:5px;
        margin-bottom:5px;
    }
    span{
        width:100%;
        display:inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
    }
`;

const Reviews = styled.div`
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
	background-color:rgba(40, 40, 40, 1) !important;
	box-shadow:0 0 15px rgba(255, 255, 255, 0.1) !important;
	border-radius:13px !important;
	*{
		color: rgba(255, 255, 255, 0.85) !important;
	}
`;

const SDialog = styled(Dialog)`
    overflow:scroll !important;
    max-width:100% !important;
    width:100% !important;
    background:none !important;
`;

const Main = ({ movie, props }) =>{
	const [isModal, setModal] = useState([false, -1]);
    return(
        <Parent>
            <TopBox back={demonslayerwall}>
                <Content>
                    <Tooltip title="back">
                        <Button
                            onMouseDown={() => props.history.goBack()}
                        ><ArrowBackIcon /></Button>
                    </Tooltip>
                    <MainContent>
                        <MovieInfo>
                            <Desc>{movie.details}<br /><br />Genre: {movie.genres.map(g => <Genre>{g}</Genre>)}</Desc>
                            <P>Your Rating</P>
                            <HoverRating user="asd" parentProps={{...props}} />
                            <BigTitle>
                                <Title>
                                    <Released><span>Released on </span><span>16 October 2020</span></Released>
                                    {movie.title.toUpperCase()}
                                </Title>
                                <MyButton
                                    to={{ pathname: movie.trailer }}
                                    back="none"
                                    color="white" 
                                    border
                                    label='Watch Trailer'
                                    target="_blank"
                                />
                                <MyButton
                                    to={{ pathname: movie.wiki }}
                                    back="black"
                                    color="white" 
                                    label=' Wiki '
                                    target="_blank"
                                />
                            </BigTitle>
                        </MovieInfo>
                        <MovieCast>
                            <Director>
                                <div>
                                    <Img src={movie.director.img} />
                                </div>
                                <div>
                                    <span className="name">{movie.director.name}</span><br />
                                    <span className="dir">The Director</span>
                                </div>
                            </Director>
                            <P>Main Cast</P>
                            <Cast>
                                {
                                    movie.cast.slice(0, 4).map((char, index) =>{
                                        return(
                                            <Character key={index} to={{ pathname: char.wiki }} target="_blank">
                                                <img src={char.profilePic} alt="cast" /><br />
                                                {char.name}<br />
                                                <span>as {char.role}</span>
                                            </Character>
                                        )
                                    })
                                }
                            </Cast>
                        </MovieCast>
                    </MainContent>
                </Content>
            </TopBox>
            <Details>
                <Left>
                    <StoryLine className="scrollEffect">
                        <SmallHeading text="Storyline" /><br />
                        {movie.storyline}
                    </StoryLine>
                    <FullDetails className="scrollEffect">
						<p>
							<span>Title:</span> {movie.title}
						</p>
						<p>
							<span>Released:</span> {movie.releasedOn} ({movie.releasedIn})
						</p>
						<p>
							<span>Country Of Origin:</span> {movie.origin}
						</p>
						<p>
							<span>Cast: </span> 
							{
								movie.cast.slice(0, 4).map((char, index) =>{
									return(
										<Link key={index} to={{ pathname: char.wiki }} target="_blank">
											{char.name}, 
										</Link>
									)
								})
							}
						</p>
						<p>
							<span>Runtime:</span> {movie.runtime}
						</p>
						<p className="genre">
							<span>Genres: </span>
							{
								movie.genres.slice(0, -1).map(g => <>{g} | </>)
							}
							{
								(movie.genres.length !== 1) ? (
									<>{movie.genres.at(-1)}</>
								) : (null)
							}
						</p>
                    </FullDetails>
                    <FullCast className="scrollEffect">
                        <SmallHeading text="Full Cast" />
                        <table>
                            <tbody>
                                {
                                    movie.cast.map((char, index) =>{
                                        return(
                                            <Link to={{pathname: char.wiki}} target="_blank" key={index}>
                                                <tr>
                                                    <td className="avatar">
                                                        <Avatar alt={char.name} src={char.profilePic} />
                                                    </td>
                                                    <td className="name">
                                                        <p>{char.name}</p>
                                                    </td>
                                                    <td className="role">
                                                        <p>{char.role}</p>
                                                    </td>
                                                </tr>
                                            </Link>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </FullCast>
                </Left>
                <Right>
                    <Rating className="scrollEffect">
                        <h1>Rating</h1>
                        <p>{movie.averageRating}</p>
                        <p> 910k users | 245 critics</p>
                    </Rating>
					<Score color={ScoreLevel(movie.criticScore)} className="scrollEffect">
						<h1>Critic Score</h1>
						<p>{movie.criticScore}</p>
					</Score>
                    <More className="scrollEffect">
                        <h1>More Like This</h1><br />
                        <Movies>
                            {
                                dummyData.map((likeMovie, index) =>{
                                    return(
                                        <Link to={`/movie/${likeMovie.title}`} key={index}>
                                            <img src={likeMovie.src} alt={likeMovie.title} /><br />
                                            <span>{likeMovie.title}</span>
                                        </Link>
                                    )
                                })
                            }
                        </Movies>
                    </More>
                </Right>
            </Details>
            <Reviews>
                <p className="top scrollEffect">Top Reviews</p>
                <Container className="scrollEffect">
                    <input type="radio" name="dot" id="one" />
                    <input type="radio" name="dot" id="two" />
                    <MainCard className="mainCard">
                        {
                            (movie.reviews.reduce((r, e, i) =>{
                                return(
                                    ((i % 3) ? r[r.length - 1].push(e) : r.push([e])) && r
                                )
                            }, [])).map((group, index) =>
                                <Cards key={index}>
                                    {
                                        group.map((review, index) =>
                                            <>
                                                <SCard onClick={() => setModal([true, movie.reviews.indexOf(review)])} key={movie.reviews.indexOf(review)}>
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
                        <label for="one" className="active one"></label>
                        <label for="two" className="two"></label>
                    </Buttons>
                </Container>
            </Reviews>
        </Parent>
    )
}

const Movie = (props) =>{
    const [movie, setMovie] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
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
        (movie === "") ? (<Waiting open={true} />) : (
            <Main 
                movie={movie}
                props={props}
            />
        )
    )
}

export default withRouter(Movie);