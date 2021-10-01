import axios from "axios";

const LoadData = (setUser, setLoading, enqueueSnackbar) =>{
    axios.get('/getUser')
    .then(res =>{
        setUser(res.data);
        setLoading(false);
    })
    .catch(err =>{
        console.log(err);
        enqueueSnackbar(err.response.status + " Internal Server Error !", { variant : "error" });
    })    
}

export default LoadData;