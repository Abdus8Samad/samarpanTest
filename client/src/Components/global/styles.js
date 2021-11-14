import React from 'react';
import styled from 'styled-components';

const media = (width) => `@media only screen and (max-width:${width}px)`;

const Title = styled.p`
    font-size:30px;
    ${media(600)}{
        font-size:25px;
    }
    ${props => props.sx}
`;

const Hr = styled.hr`
    position:relative;
    top:-15px;
    width:25vw;
    float:left;
    height:1.5px;
    border:none;
    background-color:rgba(255, 255, 255, 0.6);
    ${media(600)}{
        width:60vw;
    }
    ${props => props.sx}
`;

export const SmallHeading = ({text, sx}) =>{
    return(
        <>
            <Title sx={sx}>{text}</Title>
            <Hr sx={sx} />
        </>
    )
}