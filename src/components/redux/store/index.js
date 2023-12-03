import { MobileNavReducer } from "../reducers/MobileNavReducer";
import { signUpReducer } from "../reducers/SignUpReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { themesReducer } from "../reducers/ThemesReducer";
import { currentChatReducer } from "../reducers/CurrentChatReducer";
import { profileReducer } from "../reducers/ProfileReducer";
import { groupChatsReducer } from "../reducers/GroupChatsReducer";
import { createModalReducer } from "../reducers/CreateModalReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const Root = combineReducers({
  mobileNav: MobileNavReducer,
  signUp: signUpReducer,
  themes: themesReducer,
  current: currentChatReducer,
  userProfile: profileReducer,
  groupChats: groupChatsReducer,
  createModal: createModalReducer,
});

export const store = createStore(
  Root,
  composeWithDevTools(applyMiddleware(thunk))
);
