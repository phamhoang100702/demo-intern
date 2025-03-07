import {get} from "../../utils"
const LISTEN_ADMIN = "api/v1/listen/"

export const countClickByDay = async ()=>{
    return await get(`${LISTEN_ADMIN}/top-of-the-day`);
}

export const countClickByMonth =async ()=>{
    return await get(`${LISTEN_ADMIN}/top-of-the-month`);
}
export const countClickByWeek = async()=>{
    return await get(`${LISTEN_ADMIN}/top-of-the-week`);
}

export const countClickAll =async ()=>{
    return await get(`${LISTEN_ADMIN}/all`);
}

export const getTotalClick =async ()=>{
    return await get("listen/top-of-the-week");
}

// http://localhost:9000/api/v1/click/history/user/20
