import { Backdrop, CircularProgress } from "@mui/material";

const Waiting = ({ open }) =>{
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
export default Waiting;