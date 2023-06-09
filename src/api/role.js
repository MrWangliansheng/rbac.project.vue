import axios from "@/utils/request"

export function GetRoleAll(params) {
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

export function RoleEdit(id) {
    return axios.get("/Role/EditRole?id=" + id)
}

export function UpdateRole(data) {
    return axios.put("/Role/UpdateRole", data)
}

export function GetRolePowerButton(params) {
    return axios.get("/Role/GetRolePowerButton", {
        params
    })
}
export function GetRolePower() {
    return axios.get("/Role/GetRolePower")
}