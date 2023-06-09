import axios from 'axios';

import {
    MessageBox,
    Message
} from 'element-ui';
import Vue from 'vue';

axios.defaults.baseURL = process.env.VUE_APP_BASEURL + "/api"

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = `${Vue.ls.get('token')}`
    return config;
}, function (error) {
    return Promise.reject(error);
});


let state = true;
export function GetNewToken(config) {
    axios.get("/User/GetNewToken?token=" + (`${Vue.ls.get('token')}`).replace("Bearer ", "")).then(d => {
        if (d.result == 200) {
            Vue.ls.set("token", d.key, 540000);
            config.headers['Authorization'] = `${Vue.ls.get('token')}`
            console.log("获取了新的Token");
            console.log(config);
            return axios(config);
        } else {
            Message({
                message: "登录已失效请重新登录",
                type: "error",
                duration: 5 * 1000
            })
        }
    }).catch(err => {
        console.log(err);
    })
}
axios.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.result === 500) {
            console.log(response.config)
            Message({
                message: res.message,
                type: "error",
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message))
        } else {
            if (state && Vue.ls.get("token") != null) {
                state = false
                GetNewToken(response.config);
                setInterval(() => {
                    GetNewToken(response.config);
                }, 280000);
            }
            return res;
        }
    },
    error => {
        console.log('拦截器响应失败')
        console.log(error)
        if (error.request) {
            console.log(error.request)
        } else if (error.response) {
            // console.log(error.response.data);
            console.log(error.response.status);
        }
        if (error && error.response) {
            const config = error.response.config;
            switch (error.response.status) {
                case 400: console.log('请求错误(400)');
                    break;
                case 401:
                    // setInterval(() => {
                    //     GetNewToken(error.response.config);
                    // }, 28000);
                    // console.log(123123897123871982)
                    console.log("未授权(401)")
                    break;
                case 403: console.log('拒绝访问(403)');
                    break;
                case 404: console.log('请求出错(404)');
                    break;
                case 408: console.log('请求超时(408)');
                    break;
                case 500: console.log('服务器错误(500)');
                    break;
                case 501: console.log('服务未实现(501)');
                    break;
                case 502: console.log('网络错误(502)');
                    break;
                case 503: console.log('服务不可用(503)');
                    break;
                case 504: console.log('网络超时(504)');
                    break;
                case 505: console.log('HTTP版本不受支持(505)');
                    break;
                default: console.log('连接出错'`(${error.response.status})!`);
            }
        } else {
            console.log('连接服务器失败!')
        }
        console.log(error)
    }
)
export default axios;