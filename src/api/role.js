import axios from "@/utils/request"

export function GetRoleAll(params) {
    // debugger
    return axios({
        method: "get",
        url: '/Role/GetRole',
        params
    })
}

export function CreateRole(data) {
    return axios({
        method: "post",
        url: '/Role/CreateRole',
        data
    })
}
export function GetRoleTree(data) {
    return axios({
        method: "get",
        url: '/Role/GetRoleTree',
        data
    })
}

export function LogicDeleteAsyncRole(id) {
    return axios.delete("/Role/LogicDeleteAsyncRole?id=" + id)
}