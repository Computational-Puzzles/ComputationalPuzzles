import axios from 'axios';
import { env } from '../../next.config.js';

const { baseUrl } = env;

const Axios = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Axios;
