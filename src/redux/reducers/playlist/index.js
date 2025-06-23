const initialState = {
    data: {},
};

export const PlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_LIST_SONG_OF_PLAYLIST":
            return {
                ...state,
                data: action.payload,
            };

        default:
            return state;
    }
};
