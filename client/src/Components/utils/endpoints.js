// All the loading APIS are here

import wrapPromise from './wrapPromise';
import axios from 'axios';

const fetchUser = () =>{
    const promise = 
    axios.get('/getUser')
    .then(res => res.data);
    return promise;
}

// Firing this function will fire all the functions inside it
export const loadResources = () =>{
    return {
        loadUser: wrapPromise(fetchUser)
    }
}