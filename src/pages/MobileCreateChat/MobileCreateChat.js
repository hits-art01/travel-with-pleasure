import React from "react";
import style from "./mobile-create-chat.module.css";
import AddAvatarImg from "../../components/assets/AddChatAvatarIcon.svg";
import BackArrowIcon from "../../components/assets/arrow_back icon.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  clearState,
  closeCreateModal,
} from "../../components/redux/actions/actions";
import { postGroupChat } from "../../components/server/postNewChat";
import { useNavigate } from "react-router-dom";

const MobileCreateChat = () => {
  const [fields, setFields] = useState({
    name: "",
    description: "",
  });
  const [category, setCategory] = useState("");
  const isOpenCreate = useSelector((state) => state.createModal.isOpened);
  const groupChats = useSelector((state) => state.groupChats.chats);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRadio = (event) => {
    setCategory(event.target.value);
  };
  const handleName = (e) => {
    setFields({ ...fields, name: e.target.value });
  };
  const handleAddInfo = (e) => {
    setFields({ ...fields, description: e.target.value });
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

  const handleCreateGroupChat = async () => {
    if (fields.name && fields.description && category) {
      await postGroupChat(fields);
      dispatch(clearState());
      navigate("/chats");
    }
  };

  return (
    <div
      className={style.create_chat_wrap}
      id={style.unblured}
      onClick={(e) => e.stopPropagation()}
    >
      <header className={style.create_chat_header}>
        <div className={style.create_chat_leave} onClick={() => navigate(-1)}>
          <img src={BackArrowIcon} />
        </div>
        <h3 className={style.create_chat_header_title}>Create a group chat</h3>
      </header>
      <div className={style.create_chat}>
        <div className={style.create_chat_add_avatar}>
          <label htmlFor="image" className="">
            <input
              type="file"
              name="image"
              id="image"
              style={{ display: "none" }}
            />
            <img src={AddAvatarImg} />
          </label>
        </div>
        <form className={style.create_chat_name}>
          <p>Chat name</p>
          <input
            placeholder={"Create chat name"}
            type={"text"}
            value={fields.name}
            className={style.create_chat_name_input}
            onChange={handleName}
          />
        </form>
        <div className={style.create_chat_category}>
          <div className={style.create_chat_category_warning}>
            Choose the category of the future chat. If there is no such
            category, create it as a subcategory to one of the existing ones.
          </div>
          <div className={style.chat_themes}>
            <div
              className={
                category === "Travel in Ukraine"
                  ? `${style.theme} ${style.checked}`
                  : `${style.theme}`
              }
            >
              <input
                type="radio"
                id="radio1"
                name="category"
                value={"Travel in Ukraine"}
                onChange={handleRadio}
                checked={category === "Travel in Ukraine"}
              />
              <label htmlFor="radio1">
                <span>Travel in Ukraine</span>
              </label>
            </div>
            <div
              className={
                category === "Travel Abroad"
                  ? `${style.theme} ${style.checked}`
                  : `${style.theme}`
              }
            >
              <input
                type="radio"
                id="radio2"
                name="category"
                value={"Travel Abroad"}
                onChange={handleRadio}
                checked={category === "Travel Abroad"}
              />
              <label htmlFor="radio2">
                <span>Travel Abroad</span>
              </label>
            </div>
            <div
              className={
                category === "Extreme tourism"
                  ? `${style.theme} ${style.checked}`
                  : `${style.theme}`
              }
            >
              <input
                type="radio"
                id="radio3"
                name="category"
                value={"Extreme tourism"}
                onChange={handleRadio}
                checked={category === "Extreme tourism"}
              />
              <label htmlFor="radio3">
                <span>Extreme tourism</span>
              </label>
            </div>

            <div
              className={
                category === "Hotels and recreation complexes"
                  ? `${style.theme} ${style.checked}`
                  : `${style.theme}`
              }
            >
              <input
                type="radio"
                id="radio4"
                name="category"
                value={"Hotels and recreation complexes"}
                onChange={handleRadio}
                checked={category === "Hotels and recreation complexes"}
              />
              <label htmlFor="radio4">
                <span>Hotels and recreation complexes</span>
              </label>
            </div>
            <div
              className={
                category === "Other"
                  ? `${style.theme} ${style.checked}`
                  : `${style.theme}`
              }
            >
              <input
                type="radio"
                id="radio5"
                name="category"
                value={"Other"}
                onChange={handleRadio}
                checked={category === "Other"}
              />
              <label htmlFor="radio5">
                <span>Other</span>
              </label>
            </div>
          </div>
        </div>
        <form className={style.create_chat_name}>
          <p>Additional information</p>
          <textarea
            placeholder={"Text..."}
            maxLength={300}
            type={"text"}
            value={fields.description}
            className={style.create_chat_text}
            onChange={handleAddInfo}
          />
          <span>maximum 300 symbols</span>
        </form>
        <div className={style.create_chat_btns}>
          <button
            className={style.create_chat_save}
            onClick={handleCreateGroupChat}
          >
            Save
          </button>
          <button
            className={style.create_chat_cancel}
            onClick={() => {
              setFields({
                name: "",
                description: "",
              });
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCreateChat;
