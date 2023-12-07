import React, { useEffect, useState } from "react";
import style from "./chat-main-page.module.css";
import Head from "../../components/Head/Head";
import SettingsIcon from "../../components/assets/SettingsIcon.png";
import HelpIcon from "../../components/assets/help icon.png";
import Chatbg from "../../components/assets/Chatbg.png";
import NotificationsIcon from "../../components/assets/notifications icon.png";
import LanguageIcon from "../../components/assets/language icon.png";
import LocationIcon from "../../components/assets/person_pin icon.png";
import SettingsChatIcon from "../../components/assets/settings icon.png";
import BlockedIcon from "../../components/assets/Blocked.png";
import SignOutImg from "../../components/assets/move_item icon.png";
import Search from "../../components/assets/search_mobile.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupChats,
  getGroups,
  getUserProfile,
  openModalCreate,
  setCurrentChat,
  setUserProfile,
} from "../../components/redux/actions/actions";
import CurrentChat from "../../components/CurrentChat/CurrentChat";

import MobileVersion from "./MobileVersion";

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
  const groupChats = useSelector((state) => state.groupChats.userChats.chats);
  const allGroups = useSelector((state) => state.allGroups.groups.chats);
  const { width } = useWindowSize();
  const [isSearch, setIsSearch] = useState(false);
  const [searched, setSearched] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isChatsSearched, setIsChatSearched] = useState(false);
  const [randomChat, setRandomChat] = useState(null);

  const { pathname } = useLocation();

  const handleClickChat = (chat) => {
    dispatch(setCurrentChat(chat));
    setIsSearch(false);
    setIsChatSearched(false);
    setQuery("");
  };

  // useEffect(() => {
  //   if (pathname === "/chats/search") {
  //     setIsSearch(true);
  //   } else {
  //     setIsSearch(isSearch);
  //   }
  // }, [pathname]);

  const handleClickModal = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const signOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("searchHistory");
    navigate("/");
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleStartSearch = (e) => {
    e.stopPropagation();
    setIsSearch(true);
    setSearched([]);
    dispatch(getGroups());
    setRandomChat(allGroups[Math.floor(Math.random() * allGroups.length)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allGroups.length && query) {
      const results = allGroups.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearched(results);
      setIsChatSearched(true);

      if (query.trim() !== "") {
        const newHistory = [query, ...searchHistory.slice(0, 3)];
        setSearchHistory(newHistory);

        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      }
    }

    console.log(query);
  };

  const handleSetQuery = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getGroupChats());
  }, []);

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
            {isOpenCreate ? <CreateChat /> : null}
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
                    <form
                      className={style.aside_input_wrap}
                      onSubmit={handleSubmit}
                      id="formSearch"
                    >
                      <input
                        type="text"
                        placeholder="Search"
                        onClick={handleStartSearch}
                        value={query}
                        onChange={handleSearch}
                        className={style.aside_chats_input}
                      />
                      <button type="submit" form="formSearch">
                        <img src={Search} />
                      </button>
                    </form>
                  </div>
                  <div className={style.aside_chats_wrap}>
                    {isSearch ? (
                      searched.length > 0 ? (
                        searched.map((chat) => (
                          <div
                            key={chat.name}
                            className={`${style.aside_chat} ${
                              currentChat && currentChat.chat.name === chat.name
                                ? style.aside_chat_active
                                : ""
                            }`}
                            onClick={() => handleClickChat(chat)}
                          >
                            <div className={style.aside_chat_icon}>
                              <img src={chat.avatar} alt={chat.name} />
                            </div>
                            <div className={style.aside_chat_name}>
                              {chat.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={style.chats_searched}>
                          {searched.length === 0 && isChatsSearched ? (
                            <div className={style.search_nothing}>
                              {"nothing found("}
                            </div>
                          ) : (
                            <>
                              <div className={style.recently_searched}>
                                <p>Recently searched</p>
                                <ul className={style.recently_searched_history}>
                                  {searchHistory.map((item, index) => (
                                    <li
                                      onClick={() => handleSetQuery(item)}
                                      key={index}
                                      className={style.searched_item}
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className={style.search_might_like}>
                                you might like it
                                {randomChat.name ? (
                                  <div
                                    key={randomChat.name}
                                    className={`${style.aside_chat} ${
                                      currentChat &&
                                      currentChat.chat.name === randomChat.name
                                        ? style.aside_chat_active
                                        : ""
                                    }`}
                                    onClick={() => handleClickChat(randomChat)}
                                  >
                                    <div className={style.aside_chat_icon}>
                                      <img
                                        src={randomChat.avatar}
                                        alt={randomChat.name}
                                      />
                                    </div>
                                    <div className={style.aside_chat_name}>
                                      {randomChat.name}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </>
                          )}
                        </div>
                      )
                    ) : groupChats ? (
                      groupChats.length > 0 ? (
                        groupChats.map((chat) => (
                          <div
                            key={chat.name}
                            className={`${style.aside_chat} ${
                              currentChat && currentChat.chat.name === chat.name
                                ? style.aside_chat_active
                                : ""
                            }`}
                            onClick={() => handleClickChat(chat)}
                          >
                            <div className={style.aside_chat_icon}>
                              <img src={chat.avatar} alt={chat.name} />
                            </div>
                            <div className={style.aside_chat_name}>
                              {chat.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>There are no chats yet</div>
                      )
                    ) : (
                      <div>nothing found</div>
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
