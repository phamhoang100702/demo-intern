import {get,put,post,del} from "../../utils"

const PRE_ADMIN = "admin/"

export const searchAllUser = async(keyword="",page= null,size= null) => {
    return await get(`${PRE_ADMIN}/user?keyword=${keyword}&page=${page}&size=${size}`);
}

export const getUserById = async(id) => {
    return await get(`${PRE_ADMIN}/user/${id}`);
}

export const addUser = async(obj) =>{
    return await post(`${PRE_ADMIN}/user`,obj)
}

export const updateUser = async(obj) =>{
    return await put(`${PRE_ADMIN}/user`,obj);
}
export const deleteUserById = async(id)=>{
    return await del(`${PRE_ADMIN}/user/${id}`)
}

export const getTotalUser = async()=>{
    return await get(`${PRE_ADMIN}/user/count`)
}
export const getUserInformation = async (token) => {
    return await post(`${PRE_ADMIN}/user/information`, {
        token: token
    })
}
