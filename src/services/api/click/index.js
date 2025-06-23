import {get} from "../../utils"

const LISTEN_ADMIN = "admin/listen-service"

export const countClickByDay = async () => {
    return await get(`${LISTEN_ADMIN}/top-of-the-day`);
}

export const countClickByMonth = async () => {
    return await get(`${LISTEN_ADMIN}/top-of-the-month`);
}
export const countClickByWeek = async () => {
    return await get(`${LISTEN_ADMIN}/top-of-the-week`);
}

export const countClickAll = async () => {
    return await get(`${LISTEN_ADMIN}/all`);
}

export const getTotalClick = async () => {
    return await get(`${LISTEN_ADMIN}/total-listen`);
}

// http://localhost:9000/api/v1/click/history/user/20
