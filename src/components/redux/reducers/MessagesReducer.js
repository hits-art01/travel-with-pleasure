const messagesState = {
  messages: [
    {
      nic: "",
      text: "",
      timeStamp: "",
    },
  ],
};

export const messagesReducer = (state = messagesState, action) => {
  switch (action.type) {
    case "SET_NEW_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};
