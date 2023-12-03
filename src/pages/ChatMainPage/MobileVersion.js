import React, { useEffect, useState } from "react";
import style from "./chat-main-page.module.css";
import Burger from "../../common/Burger/Burger";
import Logo from "../../components/assets/logo twp.svg";
import Search from "../../components/assets/search_mobile.png";
import BackBtn from "../../components/assets/arrow_back icon.png";
import EmptyChat from "../../components/assets/illustration empty chat.png";
import FileIcon from "../../components/assets/attach_file icon.png";
import AudioChat from "../../components/assets/mic icon.png";
import NotificationsIcon from "../../components/assets/notifications icon.png";
import LanguageIcon from "../../components/assets/language icon.png";
import LocationIcon from "../../components/assets/person_pin icon.png";
import SettingsChatIcon from "../../components/assets/settings icon.png";
import BlockedIcon from "../../components/assets/Blocked.png";
import SignOutImg from "../../components/assets/move_item icon.png";
import HelpIcon from "../../components/assets/help icon.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getGroupChats,
  setCurrentChat,
} from "../../components/redux/actions/actions";

const MobileVersion = () => {
  const currentChat = useSelector((state) => state.current);
  const groupChats = useSelector((state) => state.groupChats.chats.userChats);
  const userProfile = useSelector((state) => state.userProfile.profile);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClickChat = (chat) => {
    console.log("Clicked chat:", chat);
    dispatch(setCurrentChat(chat));
    console.log("Current chat after dispatch:", currentChat);
    navigate(`/chats/${chat.name}`);
  };

  const signOut = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  // useEffect(() => {
  //   dispatch(getGroupChats());
  // }, []);

  useEffect(() => {
    if (pathname === "/chats") {
      dispatch(setCurrentChat({ name: null, photo: null }));
    }
  }, [pathname]);

  return (
    <div className={style.mobile_version_wrap}>
      <div className={style.mobile_version}>
        <header className={style.mobile_version_header}>
          <div className={style.header_content}>
            <div
              className={style.header_burger}
              onClick={() => setIsSettingsVisible(!isSettingsVisible)}
            >
              <Burger />
              {isSettingsVisible ? (
                <div
                  className={style.mobile_settings_modal}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={style.settings_modal_content}>
                    <div className={style.mobile_modal_userinfo}>
                      <div className={style.modal_userinfo_main}>
                        <div className={style.mobile_userinfo_avatar}>
                          <img src={userProfile.avatar} />
                        </div>
                        <h4 className={style.mobile_userinfo_name}>
                          {userProfile.nickname}
                        </h4>
                      </div>
                      <div
                        className={style.mobile_modal_close}
                        onClick={() => setIsSettingsVisible(false)}
                      >
                        x
                      </div>
                    </div>
                    <div className={style.settings_modal_tabs}>
                      <div className={style.settings_modal_tab}>
                        <div className={style.tab_main}>
                          <div className={style.tab_img}>
                            <img src={NotificationsIcon} />
                          </div>
                          <div className={style.mobile_tab_title}>
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
                          <div className={style.mobile_tab_title}>Language</div>
                        </div>
                        <div className={style.tab_arrow}>{">"}</div>
                      </div>
                      <div className={style.settings_modal_tab}>
                        <div className={style.tab_main}>
                          <div className={style.tab_img}>
                            <img src={LocationIcon} />
                          </div>
                          <div className={style.mobile_tab_title}>
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
                          <div className={style.mobile_tab_title}>
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
                          <div className={style.mobile_tab_title}>
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
                    <div className={style.aside_help}>
                      <div className={style.aside_help_icon}>
                        <img src={HelpIcon} />
                      </div>
                      <div className={style.aside_help_title}>Help Center</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className={style.header_logo}>
              <img src={Logo} />
            </div>
            <div className={style.header_search}>
              <img src={Search} />
            </div>
          </div>
        </header>
        <select className={style.aside_chats_select}>
          <option className={style.aside_chats_option}>All Chats</option>
          <option className={style.aside_chats_option}>Private messages</option>
        </select>
        <div className={style.aside_chats_wrap}>
          {groupChats
            ? groupChats.map((chat) => (
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
                  <div className={style.aside_chat_name}>{chat.name}</div>{" "}
                </div>
              ))
            : "there are not chats here yet"}
        </div>
        <div className={style.mobile_create_chat}>
          <div
            className={style.mobile_create_btn}
            onClick={() => navigate("/chats/createGroupChat")}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileVersion;
