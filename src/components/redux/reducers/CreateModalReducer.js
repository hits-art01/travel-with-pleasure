const modalState = {
  isOpened: false,
};

export const createModalReducer = (state = modalState, action) => {
  switch (action.type) {
    case "OPEN_MODAL_CREATE":
      return {
        ...state,
        isOpened: true,
      };

    case "CLOSE_MODAL_CREATE":
      return {
        ...state,
        isOpened: false,
      };
    default:
      return state;
  }
};
