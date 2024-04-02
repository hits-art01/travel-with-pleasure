const socketState = {
  ws: null,
};

export const socketReducer = (state = socketState, action) => {
  switch (action.type) {
    case "SET_SOCKET":
      return {
        ...state,
        ws: action.payload,
      };
    default:
      return state;
  }
};
