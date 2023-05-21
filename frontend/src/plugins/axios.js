import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
