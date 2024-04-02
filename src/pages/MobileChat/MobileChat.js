import React, { useEffect } from "react";
import style from "./mobile-chat.module.css";
import { setCurrentChat } from "../../components/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Search from "../../components/assets/search_mobile.png";
import BackBtn from "../../components/assets/arrow_back icon.svg";
import EmptyChat from "../../components/assets/illustration empty chat.png";
import FileIcon from "../../components/assets/attach_file icon.png";
import AudioChat from "../../components/assets/mic icon.png";

const MobileChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentChat = useSelector((state) => state.current);

  // useEffect(() => {
  //   if (!currentChat.chat.name) {
  //     navigate("/chats");
  //   }
  // }, [currentChat]);

  return (
    <div className={style.mobile_version_wrap}>
      <div className={style.mobile_version}>
        <header className={style.mobile_version_header_chat}>
          <div className={style.header_content}>
            <div className={style.header_chat}>
              <div
                className={style.header_back_to_chats}
                onClick={() => navigate("/chats")}
              >
                <img src={BackBtn} />
              </div>
              <div
                className={style.header_chat_avatar}
                onClick={() =>
                  navigate(`/chats/${currentChat.chat.name}/about`)
                }
              >
                <img src={currentChat.chat.avatar} />
              </div>
              <div
                className={style.header_chat_titles}
                onClick={() =>
                  navigate(`/chats/${currentChat.chat.name}/about`)
                }
              >
                <div className={style.header_chat_name}>
                  {currentChat.chat.name}
                </div>
                <div className={style.header_chat_members}>
                  {currentChat.chat.userIds.length} members
                </div>
              </div>
            </div>
            <div className={style.header_search}>
              <img src={Search} />
            </div>
          </div>
        </header>
        <div className={style.mobile_chat_messages}>
          <div className={style.mobile_chat_no_messages}>
            <div className={style.nomessages_img}>
              <img src={EmptyChat} />
            </div>
            <div className={style.nomessages_text}>
              There are no messages here yet. Start a conversation, soon users
              will join you.
            </div>
          </div>
        </div>
        <div className={style.mobile_chat_footer}>
          <form className={style.mobile_chat_form}>
            <input type="text" placeholder="Enter new message" />
            <div className={style.mobile_form_files}>
              <div className={style.mobile_form_file}>
                <img src={FileIcon} />
              </div>
              <div className={style.mobile_form_audio}>
                <img src={AudioChat} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileChat;
