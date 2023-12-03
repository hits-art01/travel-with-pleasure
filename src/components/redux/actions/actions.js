import { BASE_URL } from "../../../env";
import axios from "axios";

export const closeWindow = () => {
  return {
    type: "CLOSE",
  };
};
export const closeCreateModal = () => {
  return {
    type: "CLOSE_MODAL_CREATE",
  };
};
export const openModalCreate = () => {
  return {
    type: "OPEN_MODAL_CREATE",
  };
};

export const Signup = (data) => {
  return {
    type: "SIGN_UP",
    payload: data,
  };
};

export const setPhoto = (data) => {
  return {
    type: "SET_PHOTO",
    payload: data,
  };
};

export const setAuthInfo = (data) => {
  console.log("!!!!!!!");
  console.log(data);
  console.log("!!!!!!!");
  return {
    type: "SET_AUTH",
    payload: data,
  };
};
export const setThemesInfo = (payload) => ({
  type: "SET_THEMES_INFO",
  payload,
});

export const setCurrentChat = (payload) => ({
  type: "SET_CURRENT_CHAT",
  payload,
});

export const clearState = () => ({
  type: "REMOVE_GROUP_CHATS",
});

export const getGroupChats = () => {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem("access"));
      // console.log("from getUser:", token);

      const req = await axios.get(`${BASE_URL}/myGroups`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });

      // setUserProfile(req.data);
      dispatch({ type: "GET_GROUP_CHATS", payload: req.data });
    } catch (error) {
      console.error("Error:", error);
    }
  };
};
export const getUserProfile = () => {
  return async function (dispatch) {
    try {
      const token = JSON.parse(localStorage.getItem("access"));
      // console.log("from getUser:", token);

      const req = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });

      // setUserProfile(req.data);
      dispatch({ type: "SET_USER_PROFILE", payload: req.data });
    } catch (error) {
      console.error("Error:", error);
    }
  };
};
