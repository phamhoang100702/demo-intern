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
    default:
      return state;
  }
};

export default modalReducer;
