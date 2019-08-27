import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  maxRedirects:0,
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'https://pmo-be.azurewebsites.net',
  // headers: {
  //   'content-Type': 'application/json',
  //   "Accept": "/",
  //   "Cache-Control": "no-cache",
  //   "Cookie": document.cookie
  // },
  // credentials: "same-origin"
});

// instance.defaults.withCredentials = true;

console.info('env',process.env.REACT_APP_API_URL,process.env.REACT_APP_ENV)

instance.interceptors.response.use(
  response => {
    console.log('response',response)
    return response},
  (error) => {
    console.error('response',error);
    // if ([401, 419].indexOf(err.response.status) > -1) {
    //   window.location.reload();
    // } else if (err.response.status === 403) {
    //   console.error('err', err)
    // } else if (err.response.status === 404) {
    //   console.error('err', err)
    // } else if (err.response.status === 405) {
    //   console.error('err', err)
    // }

    return Promise.reject(error);
  },
);

export default instance;
