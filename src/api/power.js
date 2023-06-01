import axios from "@/utils/request";

export function GetPowerTreeTableLevelone(data) {
    return axios.get('/Power/GetPowerTreeTableLevelone', {
        params: { id: data }
    })
}

export function GetPowerTree(data) {
    return axios.get('/Power/GetPowerTree')
}

export function GetPowerEnum() {
    return axios.get("/Power/GetPowerEnum")
}

export function CreatePower(data) {
    return axios.post("/Power/CreatePower", data)
}
export function GetPar(id) {
    return axios.get("/Power/GetPar?id=" + id)
}

export function EditPower(id) {
    return axios.get("/Power/EditPower?id=" + id)
}

export function UpdatePower(data) {
    return axios.put("/Power/UpdatePower", data)
}