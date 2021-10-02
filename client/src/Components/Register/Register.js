import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Redirect, withRouter } from 'react-router';
import { useSetUser, useUser } from '../Contexts/User';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useLoading } from '../Contexts/LoadingState';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Parent = styled.div`
    position:relative;
    display:flex;
`;
    
const Img = styled.img`
    width:100%;
    height:99.5vh;
    object-fit:cover;
    filter:brightness(50%);
`;
    
const Form = styled.form`
    position:relative;
    width:52vw;
    height:100vh;
    ${media(720)}{
        width:100vw;
    }
`;
    
const Poster = styled.div`
    position:relative;
    width:48vw;
    color:rgba(255, 255, 255, 0.8) !important;
    ${media(720)}{
        display:none;
    }
`;

const FormBox = styled.div`
    position:relative;
    margin:0 auto;
    width:40vw;
    top:50%;
    transform:translateY(-60%);
    *:not(a){
        color:rgba(255, 255, 255, 0.8) !important;
    }
    .username .css-1i9jpbu-MuiInputBase-root-MuiInput-root:before, .password .css-1i9jpbu-MuiInputBase-root-MuiInput-root:before{
        border-bottom:1px solid ${props => props.status} !important;
    }
    .css-1i9jpbu-MuiInputBase-root-MuiInput-root:before{
        border-bottom:1px solid rgba(255, 255, 255, 0.8) !important;
    }
    ${media(720)}{
        width:70vw;
    }
`;

const Button = styled.input`
    padding:10px;
    text-align:center;
    font-size:2vw;
    opacity:0.85;
    transition:all 0.2s ease;
    border:2px solid white;
    color:white !important;
    border-radius:7px;
    background:none;
    &:hover{
        cursor:pointer;
        opacity:1;
    }
    ${media(720)}{
        &.login{
            font-size:30px;
        }
    }
`;

const Top = styled(Link)`
    font-size:30px;
    display:block;
    text-align:center;
    color:rgba(255, 255, 255, 0.8);
    margin:20px;
`;

const Bottom = styled.p`
    position:relative;
    top:50px;
    text-align:center;
    font-size:10px;
    a{
        color:blue;
    }
`;

const Waiting = ({open}) =>{
    return(
        <Backdrop
            sx={{
                color:"#fff",
                position:"fixed",
                top:0,
                left:0,
                width:"100vw",
                height:"100vh"
            }}
            open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    )
}

const LoggedIn = () =>{
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() =>{
        enqueueSnackbar("Already Logged In !", { variant : "warning" });
    })
    return(
        <Redirect to='/' />
    )
}

const Main = ({props}) =>{
    const { enqueueSnackbar } = useSnackbar();
    const setUser = useSetUser();
    const [values, setValues] = useState({
        username: '',
        password: '',
        email:'',
        submit:false,
        avatar:'',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const submit = () =>{
        setValues({...values, submit:true});
        let { username, password, avatar, email } = values;
        axios.post('/auth/register', { username, password, avatar, email })
        .then(res =>{
            const { user, status } = res.data;
            if(status === 409){
                enqueueSnackbar(`Username ${user.username} Already Exists`, { variant : "warning" });
                setValues({...values, submit:false});
            } else {
                setUser(user);
                enqueueSnackbar(`Welcome ${user.username}`, { variant : "success" });
                enqueueSnackbar(`Congrats You Got 10 Points For Joining Us !`, { variant : "success" });
                props.history.push("/");
            }
        })
        .catch(err =>{
            enqueueSnackbar(`${err.response.status} Internal Server Error !`, { variant : "error" });
            setValues({...values, submit:false});
        });
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return(
        <Parent>
            <Poster>
                <Img src="https://wallpaperaccess.com/full/3988284.jpg" alt="Movies" />
            </Poster>
            <Form onSubmit={(e) =>{
                e.preventDefault();
                submit();
            }}>
                <FormBox>
                    <Top to='/'>
                        Samarpan&trade;
                    </Top>
                    <TextField
                        required
                        className="username"
                        status="red"
                        color="secondary"
                        id="input-with-icon-textfield"
                        onChange={handleChange('username')}
                        label="Username"
                        sx={{"margin":"20px 0", "width":"100%"}}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            maxlength:20
                        }}
                    />
                    <TextField
                        className="email"
                        color="secondary"
                        id="input-with-icon-textfield"
                        label="Email"
                        onChange={handleChange('email')}
                        sx={{"margin":"20px 0", "width":"100%"}}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        className="avatar"
                        color="secondary"
                        id="input-with-icon-textfield"
                        label="Avatar"
                        onChange={handleChange('avatar')}
                        sx={{"margin":"20px 0", "width":"100%"}}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaceIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl
                        sx={{"margin":"20px 0", "width":"100%"}}
                        variant="standard"
                        color="secondary"
                        className="password"
                    >
                        <InputLabel required htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                required
                                id="adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
                                inputProps={{
                                    pattern:"(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}",
                                    title:"Password should be at least 8 chars long with at least one lowercase letter, uppercase letter, number and a special character"
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                    </FormControl>
                    <div style={{"marginTop":"20px","textAlign":"center"}}>
                        <Button
                            type="submit"
                            className="login"
                            value="SignUp"
                        />
                    </div>
                    <Bottom>
                        Already Signed Up ? <Link to='/login'>Login</Link> instead.
                    </Bottom>
                </FormBox>
            </Form>
            <Backdrop
                sx={{
                    color:"#fff",
                    position:"fixed",
                    top:0,
                    left:0,
                    width:"100vw",
                    height:"100vh"
                }}
                open={values.submit}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Parent>
    )
}

const Register = (props) =>{
    const User = useUser();
    const Loading = useLoading();
    return(
        (!Loading.user) ? (<Waiting open={true} />) : (
            (User !== "") ? (<LoggedIn />) : (<Main props={props} />)
        )
    )
}

export default withRouter(Register);