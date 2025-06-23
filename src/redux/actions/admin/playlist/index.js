export const openModalAddNewPlaylist = () => ({
    type: "OPEN_MODAL_ADD_NEW_PLAYLIST",
    payload: true,
});

export const closeModalAddNewPlaylist = () => ({
    type: "CLOSE_MODAL_ADD_NEW_PLAYLIST",
    payload: false,
});
export const openListSongOfPlaylist = (data) => ({
    type: "OPEN_LIST_SONG_OF_PLAYLIST",
    payload: data,
});
export const searchAction = (input) => ({
    type: "SEARCH",
    payload: input,
});

export const openModalSearch = () => ({
    type: "OPEN_MODAL_SEARCH",
    payload: true,
});

export const closeModalSearch = () => ({
    type: "CLOSE_MODAL_SEARCH",
    payload: false,
});
