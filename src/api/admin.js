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
export function EditUser(data)
{
    return axios({
        method: "get",
        url: '/User/EditUser  ',
        data
    })
}