import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:3001/api',
    baseURL: 'https://backend-zw2e.onrender.com/api',
    withCredentials:true,
    headers:{
        Accept: 'application/json'
    }
});

export default instance;