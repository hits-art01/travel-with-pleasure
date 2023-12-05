import { MobileNavReducer } from "../reducers/MobileNavReducer";
import { signUpReducer } from "../reducers/SignUpReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { themesReducer } from "../reducers/ThemesReducer";
import { currentChatReducer } from "../reducers/CurrentChatReducer";
import { profileReducer } from "../reducers/ProfileReducer";
import { createModalReducer } from "../reducers/CreateModalReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userGroupChatsReducer } from "../reducers/UserGroupChatsReducer";
import { groupsReducer } from "../reducers/GroupsReducer";

const Root = combineReducers({
  mobileNav: MobileNavReducer,
  signUp: signUpReducer,
  themes: themesReducer,
  current: currentChatReducer,
  userProfile: profileReducer,
  groupChats: userGroupChatsReducer,
  createModal: createModalReducer,
  allGroups: groupsReducer,
});

export const store = createStore(
  Root,
  composeWithDevTools(applyMiddleware(thunk))
);
