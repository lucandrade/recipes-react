import Axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const url = DeviceInfo.isEmulator() ? 'http://localhost:8000/api' : 'http://recipes.lucandrade.com.br/api';

const Request = Axios.create({
    baseURL: url
});

export default Request;
