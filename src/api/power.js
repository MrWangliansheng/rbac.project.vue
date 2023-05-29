import axios from "@/utils/request";

export function GetPowerTreeTableLevelone(data)
{
    return axios.get('/Power/GetPowerTreeTableLevelone', {
        params:{id:data}
    })
}

export function GetPowerTree(data)
{
    return axios.get('/Power/GetPowerTree')
}

export function GetPowerEnum()
{
    return axios.get("/Power/GetPowerEnum")
}