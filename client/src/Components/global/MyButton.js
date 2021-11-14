// import * as React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Parent = styled(Link)`
	padding:15px;
	text-align:center;
	background:${props => props.back};
	color:${props => props.color};
	border:${props => props.border ? "0.1em solid " + props.color : ""};
	font-size:100%;
	transition:all 0.2s ease;
	opacity:0.8;
	width:${props => props.size}};
	&:hover{
		opacity:1;
	}
	${props => props.sx}
`;

const MyButton = (props) => <Parent {...props}>{props.label}</Parent>

export default MyButton;
