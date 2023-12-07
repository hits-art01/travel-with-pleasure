import React, { useEffect, useState } from "react";
import style from "../ChatMainPage/chat-main-page.module.css";
import BackBtn from "../../components/assets/arrow_back icon.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getGroups,
  setCurrentChat,
} from "../../components/redux/actions/actions";

import NothingFound from "../../components/assets/nothing found.svg";

const MobileChatsSearch = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.current);

  const [query, setQuery] = useState("");
  const groupChats = useSelector((state) => state.groupChats.userChats.chats);
  const allGroups = useSelector((state) => state.allGroups.groups.chats);

  const [isSearch, setIsSearch] = useState(true);
  const [searched, setSearched] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isChatsSearched, setIsChatSearched] = useState(false);
  const [randomChat, setRandomChat] = useState({
    name: "name",
  });

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleClickChat = (chat) => {
    dispatch(setCurrentChat(chat));
    setIsSearch(false);
    setIsChatSearched(false);
    setQuery("");
    navigate(`/chats/${chat.name}`);
  };

  const handleStartSearch = (e) => {
    e.stopPropagation();
    setIsSearch(true);
    setSearched([]);
  };

  useEffect(() => {
    setRandomChat(allGroups[Math.floor(Math.random() * allGroups.length)]);
  }, []);

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

  const handleBack = () => {
    navigate("/chats");
  };

  return (
    <div className={style.mobile_version_wrap}>
      <div className={style.mobile_version}>
        <header className={style.mobile_version_header_chat}>
          <div className={style.header_content}>
            <div
              className={style.header_back_to_chats_search}
              onClick={handleBack}
            >
              <img src={BackBtn} />
            </div>

            <form
              className={style.aside_input_wrap_mobile}
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
            </form>
          </div>
        </header>
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
                  <div className={style.aside_chat_name}>{chat.name}</div>
                </div>
              ))
            ) : (
              <div className={style.chats_searched_mobile}>
                {searched.length === 0 && isChatsSearched ? (
                  <div className={style.search_nothing_mobile}>
                    <div className={style.search_nothing_wrap}>
                      <div className={style.search_nothing_img}>
                        <img src={NothingFound} />
                      </div>

                      <p>{"nothing found("}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={style.recently_searched}>
                      <p>Recently searched</p>
                      <ul className={style.recently_searched_history_mobile}>
                        {searchHistory.map((item, index) => (
                          <li
                            onClick={() => handleSetQuery(item)}
                            key={index}
                            className={style.searched_item_mobile}
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
                  <div className={style.aside_chat_name}>{chat.name}</div>
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
    </div>
  );
};

export default MobileChatsSearch;
