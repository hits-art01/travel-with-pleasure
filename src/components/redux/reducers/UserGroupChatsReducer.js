const groupChatsState = {
  userChats: {
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

export const userGroupChatsReducer = (state = groupChatsState, action) => {
  switch (action.type) {
    case "GET_GROUP_CHATS":
      return {
        ...state,
        userChats: action.payload,
      };

    case "REMOVE_GROUP_CHATS":
      return {
        ...state,
        userChats: {
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

    default:
      return state;
  }
};
