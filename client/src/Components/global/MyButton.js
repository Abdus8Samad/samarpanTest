// import * as React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const styles = (props) =>
`
	padding:15px;
	text-align:center;
	background:${props.back};
	color:${props.color};
	border:${props.isborder ? "0.1em solid " + props.color : ""};
	font-size:100%;
	transition:all 0.2s ease;
	opacity:0.8;
	width:${props.size};
	&:hover{
		opacity:1;
		cursor:pointer;
	}
	${props.sx}
`;

const Button = styled.div`${props => styles(props)}`;
const LinkButton = styled(Link)`${props => styles(props)}`;

const MyButton = (props) =>{
	return(
		(props.button === true) ? (
			<Button {...props}>{props.label}</Button>
		) : (
			<LinkButton {...props}>{props.label}</LinkButton>
		)
	)
}
export default MyButton;
