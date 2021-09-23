import React, { useState } from 'react';
import { Backdrop, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

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
    
const Form = styled.div`
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

const Button = styled(Link)`
    padding:10px;
    text-align:center;
    font-size:2vw;
    opacity:0.8;
    transition:all 0.2s ease;
    border:2px solid white;
    color:white;
    border-radius:7px;
    &:hover{
        opacity:1;
    }
    ${media(720)}{
        &.register{
            font-size:30px;
        }
    }
`;

const Top = styled.p`
    font-size:30px;
    text-align:center;
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

const Register = () =>{
    const [values, setValues] = useState({
        username: '',
        password: '',
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
        let { username, password, avatar } = values;
        axios.post('/register', { username, password, avatar })
        .then(msg =>{
            console.log(msg);
        })
        .catch(err => console.log(err));
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const catchEnter = (event) =>{
        if(event.which === 13){
            submit();
        }
    }
    return(
        <Parent onKeyPress={catchEnter}>
            <Poster>
                <Img src="https://wallpaperaccess.com/full/3988284.jpg" alt="Movies" />
            </Poster>
            <Form>
                <FormBox>
                    <Top>
                        Samarpan&trade;
                    </Top>
                    <TextField
                        className="username"
                        status="red"
                        color="secondary"
                        id="input-with-icon-textfield"
                        onChange={handleChange('username')}
                        label="Username"
                        sx={{"margin":"35px 0", "width":"100%"}}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
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
                        sx={{"margin":"35px 0", "width":"100%"}}
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
                        sx={{"margin":"35px 0", "width":"100%"}}
                        variant="standard"
                        color="secondary"
                        className="password"
                    >
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={handleChange('password')}
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
                            to='#'
                            className="register"
                            onClick={() => submit()}
                        >SignUp</Button>
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

export default Register;