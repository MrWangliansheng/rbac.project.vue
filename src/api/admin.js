import axios from "../utils/request";
export function UserLogin(data) {
    return axios({
        method: "post",
        url: '/User/UserLog',
        data
    })
}

export function GetUserAll(data)
{
    return axios({
        method: 'get',
        url: '/User/GetUserAll',
        data
    })
}
export function UpdateUser(data)
{
    return axios({
        method: "put",
        url: '/User/UpdateUser',
        data
    })
}
export function ResetPasswrod(data)
{
    return axios({
        method: "put",
        url: '/User/ResetUserPasswrod',
        data
    })
}