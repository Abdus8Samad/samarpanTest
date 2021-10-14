import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const Parent = styled.div`

`;

const Test = () =>{
    useEffect(() =>{
        console.log("Test run !");
    }, [])
    return(
        <Parent>
            <p>Test</p>
        </Parent>
    )
}

export default withRouter(Test);