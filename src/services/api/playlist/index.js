import {del, get, post, postBlob, put} from "../../utils";

const ADMIN_PREFIX = "admin/music-service"


export const searchPlaylist = async (keyword = "", page = null, size = null) => {
    return await get(`${ADMIN_PREFIX}/playlist?keyword=${keyword}&page=${page}&size=${size}`);
};
export const getDetailPlaylist = async (id) => {
    return await get(`${ADMIN_PREFIX}/playlist/detail/${id}`);
};


// them cai creator
export const savePlaylistForUser = async (object) => {
    return await post("playlist", object);
};

export const savePlaylistForMainPage = async (object) => {
    const playlist = {
        ...object,
    };
    return await post(`${ADMIN_PREFIX}/playlist`, playlist);
};

export const exportPlaylistExcel = async (keyword) => {
    try {
        await postBlob(`${ADMIN_PREFIX}/playlist/export?keyword=${keyword}`, {
            fromDate: "2024-01-01",
            toDate: "2024-05-20"
        });
    } catch (error) {
        console.error("Export thất bại:", error);
        alert("Xuất file thất bại!");
    }
}


// main page user/ censor
export const getAllMainpagePlayList = async () => {
    return await get("playlist/mainpage");
};
// search for user
export const searchAllPlaylistByNameForUser = async (name) => {
    return await get(`user/playlist?name=${name}`);
};

export const updatePlaylist = async (options) => {
    return await put(`${ADMIN_PREFIX}/playlist`, options);
};

export const deletePlaylist = async (playlistId) => {
    return await del(`playlist/${playlistId}`);
};

export const addSongToPlaylist = async (playlistId, songId) => {
    return await post(`playlist/${playlistId}/song/${songId}`);
};
// add array to playlist
export const addSongsToPlaylist = async (playlistId, object) => {
    return await post(`${ADMIN_PREFIX}/playlist/${playlistId}/song`, object);
};


export const removeSongFromPlaylist = async (playlistId, songId) => {
    return await del(`${ADMIN_PREFIX}/playlist/${playlistId}/song/${songId}`);
};

export const getTotalPlaylist = async () => {
    return await get(`playlist/count`);
};

export const addSongToFavoritePlaylist = async (userId, songId) => {
    return await post(`user/${userId}/playlist/favorite/${songId}`, {});
};

export const removeSongToFavoritePlaylist = async (userId, songId) => {
    return await del(`user/${userId}/playlist/favorite/${songId}`)
}

export const saveFavoritePlaylist = async (object) => {
    object = {
        ...object,
        role: "FAVORITE"
    }
    return await post(`playlist`, object);
}
