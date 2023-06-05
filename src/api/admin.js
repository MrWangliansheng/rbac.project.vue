import axios from "../utils/request";
//用户登录
export function UserLogin(params) {
    return axios({
        method: "get",
        url: '/User/UserLog',
        params
    })
}
//用户信息分页
export function GetUserInfoPage(dto) {

    return axios.get('/User/GetUserInfoPage', {
        params: dto
    }).catch(err => {
        console.log(err)
    })
}
//修改用户信息
export function UpdateUser(data) {
    return axios.put('/User/UpdateUser', data)

}
//重置密码
export function ResetPasswrod(data) {
    return axios({
        method: "put",
        url: '/User/ResetUserPasswrod',
        data
    }).catch(err => {
        console.log(err)
    })
}
//逻辑删除用户信息
export function LogicDeleteUserAsync(id) {
    return axios.delete('/User/LogicDeleteAsyncUser?id=' + id)
}
//创建用户信息
export function CreateUserAsync(data) {
    return axios.post("/User/CreateUser", data)
}


export function ExportUser(data) {
    return axios({
        method: 'post',
        url: '/User/Export',
        data,
        responseType: 'blob'
    })
}
// export function GetUserName(name) {
//     return axios.get("/User/GetUserName?name=" + name)
// }