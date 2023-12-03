import React from "react";
import style from "./mobile-chat-about.module.css";
import BackBtn from "../../components/assets/arrow_back icon.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileChatSettings = () => {
  const navigate = useNavigate();
  const currentChat = useSelector((state) => state.current);
  return (
    <div className={style.mobile_version_wrap}>
      <div className={style.mobile_version_about}>
        <header className={style.chat_about_header}>
          <div className={style.header_content}>
            <div
              className={style.header_back_btn}
              onClick={() => navigate(`/chats/${currentChat.chat.name}`)}
            >
              <img src={BackBtn} />
            </div>
            <h4 className={style.header_title}>About chat</h4>
          </div>
        </header>
      </div>
    </div>
  );
};

export default MobileChatSettings;
