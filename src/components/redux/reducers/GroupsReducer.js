const groupsState = {
  groups: {
    chats: [
      {
        id: "",
        adminId: [""],
        name: "",
        avatar: "",
        description: "",
        userIds: [""],
        messageIds: [""],
      },
    ],
  },
};

export const groupsReducer = (state = groupsState, action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return {
        ...state,
        groups: action.payload,
      };

    default:
      return state;
  }
};
