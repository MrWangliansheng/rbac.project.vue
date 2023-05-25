import axios from "@/utils/request"

export function GetRoleAll(data)
{
    debugger
    return axios({
        method: "get",
        url: '/Role/GetRole',
        data
    })
}

export function CreateRole(data)
{
    return axios({
        method: "post",
        url: '/Role/CreateRole',
        data
    })
}