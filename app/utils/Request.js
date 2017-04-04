import Axios from 'axios';

const url = 'http://127.0.0.1:8000/api';

const Request = Axios.create({
    baseURL: url
});

export default Request;
