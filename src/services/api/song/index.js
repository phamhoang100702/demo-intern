import {del, get, post, post_form_data, postBlob, put, put_form_data, uploadFile} from "../../utils"

const PREFIX_ADMIN = 'admin/music-service'

export const getAllSong = async () => {
    return await get(`${PREFIX_ADMIN}/song`);
}

export const getLatestSong = async () => {
    return await get(`${PREFIX_ADMIN}/song/latest`);
}


export const getSongById = async (id) => {
    return await get(`song/${id}`)
}

export const saveSong = async (options) => {
    return await post("song", options);
}


export const saveSongWithFormData = async (options) => {
    return await post_form_data(`${PREFIX_ADMIN}/song`, options);
};


export const deleteSongById = async (songId = "") => {
    return await del(`${PREFIX_ADMIN}/song/` + songId);
}

export const getMusicCount = async () => {
    return await get(`${PREFIX_ADMIN}/count`)
}

export const updateSong = async (object) => {
    return await put("song", object);
}

export const updateSongWithFormData = async (object) => {
    return await put_form_data(`${PREFIX_ADMIN}/song`, object);
};


// la singer hoac admin
export const getAllSongByCreatorId = async (creatorId) => {
    return await get(`creator/${creatorId}/song`)
}

export const getAllSongBySingerId = async (singerId) => {
    return await get(`singer/${singerId}/song`)
}

export const uploadFileSound = async (formData) => {
    return await uploadFile("s3", formData)
}

export const getSongPage = async (name = "", pageNo = 0, pageSize = 10) => {
    return await get(`${PREFIX_ADMIN}/song?keyword=${name}&page=${pageNo}&size=${pageSize}`)
}


export const getTotalSong = async () => {
    return await get(`song/count`)
}

export const exportSongExcel = async (keyword) => {
    try {
        await postBlob(`${PREFIX_ADMIN}/song/export?keyword=${keyword}`,);
    } catch (error) {
        console.error("Export thất bại:", error);
        alert("Xuất file thất bại!");
    }
}
