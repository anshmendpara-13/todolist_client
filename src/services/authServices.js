import axios from 'axios';

// const SERVER_URL = 'http://localhost:5000/api';
const SERVER_URL = 'https://todolist-backend-git-main-anshs-projects-578576fd.vercel.app/api';


const registerUser = (data) => {
    return axios.post(SERVER_URL + '/register', data);
}

const loginUser = (data) => {
    return axios.post(SERVER_URL + '/login', data);
}


const AuthServices = {
    registerUser,
    loginUser
}


export default AuthServices;


