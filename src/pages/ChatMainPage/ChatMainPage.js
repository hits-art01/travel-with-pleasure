import React, { useEffect, useState } from "react";
import style from "./chat-main-page.module.css";
import Head from "../../components/Head/Head";
import axios from "axios";
import AvatarExample from "../../components/assets/AvatarExample.png";
import UkraineChat from "../../components/assets/UkraineChat.png";
import AbroadChat from "../../components/assets/AbroadChat.png";
import ExtremeChat from "../../components/assets/ExtremeChat.png";
import SettingsIcon from "../../components/assets/SettingsIcon.png";
import HelpIcon from "../../components/assets/help icon.png";
import Chatbg from "../../components/assets/Chatbg.png";
import NotificationsIcon from "../../components/assets/notifications icon.png";
import LanguageIcon from "../../components/assets/language icon.png";
import LocationIcon from "../../components/assets/person_pin icon.png";
import SettingsChatIcon from "../../components/assets/settings icon.png";
import BlockedIcon from "../../components/assets/Blocked.png";
import SignOutImg from "../../components/assets/move_item icon.png";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupChats,
  getUserProfile,
  openModalCreate,
  setCurrentChat,
  setUserProfile,
} from "../../components/redux/actions/actions";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import { BASE_URL } from "../../env";
import { useMemo } from "react";
import MobileVersion from "./MobileVersion";
import { useLayoutEffect } from "react";
import CreateChat from "../../components/CreateChat/CreateChat";
import { useWindowSize } from "react-use";

const ChatMainPage = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.current);
  const userProfile = useSelector((state) => state.userProfile.profile);
  const isOpenCreate = useSelector((state) => state.createModal.isOpened);
  const navigate = useNavigate();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [query, setQuery] = useState("");
  const groupChats = useSelector((state) => state.groupChats.chats.userChats);
  const { width } = useWindowSize();
  const [searched, setSearched] = useState([]);

  const handleClickChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

  const handleClickModal = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const signOut = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  useEffect(() => {
    if (groupChats) {
      const results = groupChats.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearched(results);
    }
    console.log(groupChats);
  }, [query, groupChats]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getGroupChats());
  }, []);

  const handleChatCreated = () => {
    dispatch(getGroupChats());
  };

  useEffect(() => {
    dispatch(getGroupChats());
  }, [groupChats.length]);

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  return (
    <>
      {width <= 800 ? (
        <MobileVersion />
      ) : (
        <div className={style.chat_main_page}>
          <Head />
          <div className={style.chat_main_wrap}>
            {isOpenCreate ? (
              <CreateChat onChatCreated={handleChatCreated} />
            ) : null}
            <div className={style.chat_main_content}>
              <aside
                className={
                  isOpenCreate
                    ? `${style.chat_main_aside} ${style.blured}`
                    : `${style.chat_main_aside}`
                }
              >
                <div className={style.aside_user_info}>
                  <div className={style.aside_user_maininfo}>
                    <div className={style.aside_user_avatar}>
                      <img src={userProfile.avatar} />
                    </div>
                    <div className={style.aside_username}>
                      {userProfile.nickname}
                    </div>
                  </div>
                  <div
                    className={style.aside_settings}
                    onClick={handleClickModal}
                  >
                    <img src={SettingsIcon} />
                    {isSettingsVisible ? (
                      <div
                        className={style.aside_settings_modal}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className={style.settings_modal_content}>
                          <div className={style.settings_modal_tabs}>
                            <div className={style.settings_modal_tab}>
                              <div className={style.tab_main}>
                                <div className={style.tab_img}>
                                  <img src={NotificationsIcon} />
                                </div>
                                <div className={style.tab_title}>
                                  Notification
                                </div>
                              </div>
                              <div className={style.tab_arrow}>{">"}</div>
                            </div>
                            <div className={style.settings_modal_tab}>
                              <div className={style.tab_main}>
                                <div className={style.tab_img}>
                                  <img src={LanguageIcon} />
                                </div>
                                <div className={style.tab_title}>Language</div>
                              </div>
                              <div className={style.tab_arrow}>{">"}</div>
                            </div>
                            <div className={style.settings_modal_tab}>
                              <div className={style.tab_main}>
                                <div className={style.tab_img}>
                                  <img src={LocationIcon} />
                                </div>
                                <div className={style.tab_title}>
                                  Location and time zone
                                </div>
                              </div>
                              <div className={style.tab_arrow}>{">"}</div>
                            </div>
                            <div className={style.settings_modal_tab}>
                              <div className={style.tab_main}>
                                <div className={style.tab_img}>
                                  <img src={SettingsChatIcon} />
                                </div>
                                <div className={style.tab_title}>
                                  Chat settings
                                </div>
                              </div>
                              <div className={style.tab_arrow}>{">"}</div>
                            </div>
                            <div className={style.settings_modal_tab}>
                              <div className={style.tab_main}>
                                <div className={style.tab_img}>
                                  <img src={BlockedIcon} />
                                </div>
                                <div className={style.tab_title}>
                                  Blocked users and chats
                                </div>
                              </div>
                              <div className={style.tab_arrow}>{">"}</div>
                            </div>
                          </div>
                          <button
                            className={style.settings_modal_signout}
                            onClick={signOut}
                          >
                            <div className={style.signout_img}>
                              <img src={SignOutImg} />
                            </div>
                            <span> Sign Out</span>
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={style.aside_chats}>
                  <div className={style.aside_chats_search}>
                    <select className={style.aside_chats_select}>
                      <option className={style.aside_chats_option}>
                        All Chats
                      </option>
                      <option className={style.aside_chats_option}>
                        Private messages
                      </option>
                    </select>
                    <div className={style.aside_inpit_wrap}>
                      <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={handleSearch}
                        className={style.aside_chats_input}
                      />
                    </div>
                  </div>
                  <div className={style.aside_chats_wrap}>
                    {groupChats ? (
                      searched.map((chat) => (
                        <div
                          key={chat.name}
                          className={
                            currentChat.chat.name === chat.name
                              ? `${style.aside_chat} ${style.aside_chat_active}`
                              : `${style.aside_chat}`
                          }
                          onClick={() => handleClickChat(chat)}
                        >
                          <div className={style.aside_chat_icon}>
                            <img src={chat.avatar} />
                          </div>
                          <div className={style.aside_chat_name}>
                            {chat.name}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>There are not chats yet</div>
                    )}
                  </div>
                </div>
                <div className={style.aside_footer}>
                  <div className={style.aside_create_chat}>
                    <button
                      className={style.aside_create_chat_btn}
                      onClick={() => dispatch(openModalCreate())}
                    >
                      + Create Chat
                    </button>
                  </div>
                  <div className={style.aside_help}>
                    <div className={style.aside_help_icon}>
                      <img src={HelpIcon} />
                    </div>
                    <div className={style.aside_help_title}>Help Center</div>
                  </div>
                </div>
              </aside>

              <div
                className={
                  currentChat.chat.name
                    ? `${style.chat_wrap}`
                    : `${style.chat_space}` &&
                      !currentChat.chat.name &&
                      isOpenCreate
                    ? `${style.chat_space} ${style.blured}`
                    : `${style.chat_space}`
                }
              >
                {currentChat.chat.name ? (
                  <CurrentChat />
                ) : (
                  <div
                    className={
                      isOpenCreate
                        ? `${style.chat_welcome} ${style.blured}`
                        : `${style.chat_welcome}`
                    }
                  >
                    <div className={style.chat_welcome_img}>
                      <img src={Chatbg} alt="img" />
                    </div>
                    <div className={style.chat_welcome_description}>
                      Start a conversation, click on a chat from the list <br />{" "}
                      on the left.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMainPage;
