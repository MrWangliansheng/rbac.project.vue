import axios from "../utils/request";
//用户登录
export function UserLogin(data) {
    return axios({
        method: "post",
        url: '/User/UserLog',
        data
    })
}
//用户信息分页
export function GetUserInfoPage(dto)
{
    debugger
    return axios.get('/User/GetUserInfoPage', {
        params: dto
    })
}
//修改用户信息
export function UpdateUser(data)
{
    return axios({
        method: "put",
        url: '/User/UpdateUser',
        data
    })
}
//重置密码
export function ResetPasswrod(data)
{
    return axios({
        method: "put",
        url: '/User/ResetUserPasswrod',
        data
    })
}
//逻辑删除用户信息
export function LogicDeleteUserAsync(id)
{
    return axios.delete('/User/LogicDeleteAsyncUser?id='+id)
}
//创建用户信息
export function CreateUserAsync(data)
{
    return axios.post("/User/CreateUser",data)
}