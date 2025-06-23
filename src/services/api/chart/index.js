import {get} from "../../utils"

export const ADMIN_LISTEN_PREFIX = "admin/listen-service"
export const ADMIN_SONG_PREFIX = "admin/music-service"
export const ADMIN_USER_PREFIX = "admin/user-service"


export const getDataForChart = async (date) => {
    return await get(`user/chart/date/${date}`);
}

export const getDataChartForListen = async () => {
    return await get(`${ADMIN_LISTEN_PREFIX}/count-listen-in-week`)
}

export const getDataChartForSong = async () => {
    return await get(`${ADMIN_SONG_PREFIX}/chart/new-song-in-week`)
}
// /user/new-user-in-week
export const getDataChartForUser = async () => {
    return await get(`${ADMIN_USER_PREFIX}/user/new-user-in-week`)
}
