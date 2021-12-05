import { Backdrop, CircularProgress } from "@mui/material";
import styled from 'styled-components';

const SBackdrop = styled(Backdrop)`
    color:#fff;
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    z-index:10000;
    &::after{
        content:'';
        position:fixed;
        z-index:9999;
        background:black;
        width:100%;
        height:100%;
        top:0;
        left:0;
    }
`;

const Waiting = ({ open }) =>{
    return(
        <Backdrop
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}
export default Waiting;