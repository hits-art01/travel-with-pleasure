const groupChatsState = {
  chats: {
    userChats: [
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

export const groupChatsReducer = (state = groupChatsState, action) => {
  switch (action.type) {
    case "GET_GROUP_CHATS":
      return {
        ...state,
        chats: action.payload,
      };

    case "REMOVE_GROUP_CHATS":
      return {
        ...state,
        chats: {
          userChats: [
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

    default:
      return state;
  }
};
