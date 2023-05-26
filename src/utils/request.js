import axios from 'axios';

import {
    MessageBox,
    Message
} from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_BASEURL+"/api"

axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    debugger
    const res = response.data;
    if (res.result !== 200)
    {
        Message({
            message: res.message || "Error",
            type: "error",
            duration:5*1000
        })    
        return Promise.reject(new Error(res.message||"Error"))
    } else {
        return res;
    }
}, function (error) {
    console.log(error)
})

export default axios;