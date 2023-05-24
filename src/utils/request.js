import axios from 'axios';

import {
    MessageBox,
    Message
} from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_BASEURL + "/api";
axios.interceptors.request.use(function (config) {
    debugger
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    debugger
    const res = response.data;
    return res;

}, function (error) {
    return Promise.reject(error);
})

export default axios;