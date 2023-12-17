import React, { useEffect } from "react";
import style from "./mobile-chat-about.module.css";
import BackBtn from "../../components/assets/arrow_back icon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditIcon from "../../components/assets/edit icon.svg";
import MembersIcon from "../../components/assets/group icon.svg";
import SettingsIcon from "../../components/assets/more_vert icon.svg";
import NotificationIcon from "../../components/assets/notifications icon.svg";
import BlockedIcon from "../../components/assets/Blocked.svg";
import LeaveIcon from "../../components/assets/move_item icon.svg";
import ThemeIcon from "../../components/assets/wallpaper icon.svg";

const MobileChatSettings = () => {
  const navigate = useNavigate();
  const currentChat = useSelector((state) => state.current.chat);

  useEffect(() => {
    if (!currentChat.name) {
      navigate("/chats");
    }
  }, [currentChat]);

  return (
    <div className={style.mobile_version_wrap}>
      <div className={style.mobile_version_about}>
        <header className={style.chat_about_header}>
          <div className={style.header_content}>
            <div
              className={style.header_back_btn}
              onClick={() => navigate(`/chats/${currentChat.name}`)}
            >
              <img src={BackBtn} />
            </div>
            <h4 className={style.header_title}>About chat</h4>
          </div>
        </header>
        <div className={style.about_content}>
          <div className={style.about_main_chat_info}>
            <div className={style.main_chat_info_avatar}>
              <img src={currentChat.avatar} />
            </div>
            <div className={style.main_chat_info_chatname}>
              <h3>{currentChat.name}</h3>
              <div className={style.main_chat_info_edit}>
                <img src={EditIcon} />
              </div>
            </div>
            <div className={style.main_chat_info_members}>
              <img src={MembersIcon} /> {currentChat.userIds.length} members
            </div>
          </div>
          <div className={style.about}>
            <h4>About chat</h4>
            <div className={style.about_description}>
              {currentChat.description}
            </div>
          </div>
          <div className={style.about_settings}>
            <div className={style.about_settings_item}>
              <img src={NotificationIcon} />
              <p>turn off notification</p>
            </div>
            <div className={style.about_settings_item}>
              <img src={BlockedIcon} />
              <p>block users</p>
            </div>
            <div className={`${style.about_settings_item} ${style.red}`}>
              <img src={LeaveIcon} />
              <p>leave chat</p>
            </div>
            <div className={style.about_settings_item}>
              <img src={SettingsIcon} />
              <p>settings</p>
            </div>
          </div>
          <div className={style.about_chat_theme}>
            <div className={style.theme_of_chat}>
              <img src={ThemeIcon} />
              <span>Theme of chat</span>
            </div>
            <div className={style.current_theme}>default</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileChatSettings;
