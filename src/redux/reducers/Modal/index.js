// modalReducer.js

const initialState = {
    open: false,
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return {
                ...state,
                open: true,
            };
        case "HIDE_MODAL":
            return {
                ...state,
                open: false,
            };
        case "OPEN_MODAL_DETAIL_SONG":
            return {
                ...state,
                open: true,
            };
        case "CLOSE_MODAL_DETAIL_SONG":
            return {
                ...state,
                open: false,
            };

        case "OPEN_MODAL_SEARCH":
            return {
                ...state,
                open: true,
            };

        case "CLOSE_MODAL_SEARCH":
            return {
                ...state,
                open: false,
            };

        case "OPEN_MODAL_ADD_NEW_PLAYLIST":
            return {
                ...state,
                open: true,
            };

        case "CLOSE_MODAL_ADD_NEW_PLAYLIST":
            return {
                ...state,
                open: false,
            };

        default:
            return state;
    }
};

export default modalReducer;
