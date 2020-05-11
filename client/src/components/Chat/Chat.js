import React, { useState, useEffect } from "react";
import "./Chat.css";

import createIncomingMessage from "../Messages/IncomingMessage";
import createOutgoingMessage from "../Messages/OutgoingMessage";

const Chat = () => {
  const [friends, setFriends] = useState([
    {
      id: "id1",
      name: "Shivam Khattar",
      url: "https://ptetutorials.com/images/user-profile.png",
      messages: [
        {
          message: "Hello",
          type: "in",
          date: "Oct 25",
          time: "12:00pm",
        },
        {
          message: "Bye",
          type: "out",
          date: "Oct 25",
          time: "12:01pm",
        },
      ],
    },
    {
      id: "id2",
      name: "Khaled Alqallaf",
      url: "https://ptetutorials.com/images/user-profile.png",
      messages: [
        {
          message: "Hope you had a nice day",
          type: "in",
          date: "Oct 25",
          time: "12:00pm",
        },
        {
          message: "Hey",
          type: "out",
          date: "Oct 25",
          time: "12:00pm",
        },
      ],
    },
    {
      id: "id3",
      name: "Saaed Khan",
      url: "https://ptetutorials.com/images/user-profile.png",
      messages: [
        {
          message: "Hope you had a nice day 2",
          type: "in",
          date: "Oct 25",
          time: "12:00pm",
        },
        {
          message: "Hey 2",
          type: "out",
          date: "Oct 25",
          time: "12:00pm",
        },
      ],
    },
  ]);
  const [currentChat, setCurrentChat] = useState("id1");

  const handleChangeChat = (id) => {
    console.log(id);
    setCurrentChat(id);
    const currentId = friends.filter((friend) => friend.id === currentChat)[0]
      .messages;
  };

  useEffect(() => {
    handleChangeChat(friends[0].id);
  }, []);

  const createRecentContact = (
    id,
    name,
    date,
    message,
    profilePicture,
    active
  ) => {
    var style;
    if (active) {
      style = "chat_list active_chat w-100";
    } else {
      style = "chat_list w-100";
    }
    return (
      <button
        class={style}
        style={{ border: "0px", outline: "none" }}
        onClick={(e) => handleChangeChat(id)}
      >
        <div className="chat_people">
          <div className="chat_img">
            <img src={profilePicture} alt={name} />
          </div>
          <div className="chat_ib text-left">
            <h5>
              {name} <span className="chat_date">{date}</span>
            </h5>
            <p>{message}</p>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="mainApp">
      <div class="container row align-items-center h-100 justify-content-center">
        <div class="messaging">
          <h1 class="text-center">iChat</h1>
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input
                      type="text"
                      class="search-bar text-left"
                      placeholder="Add a Contact"
                    />
                    <span class="input-group-addon">
                      <button type="button" style={{ outline: "none" }}>
                        <i class="fa fa-user-plus" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="inbox_chat">
                {friends.map((friend) => {
                  return createRecentContact(
                    friend.id,
                    friend.name,
                    friend.messages[0].date,
                    friend.messages[0].message,
                    friend.url,
                    friend.id === currentChat
                  );
                })}
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                {friends
                  .filter((friend) => friend.id === currentChat)[0]
                  .messages.map((chat) => {
                    if (chat.type === "in") {
                      return createIncomingMessage(
                        chat.message,
                        chat.time,
                        chat.date,
                        friends.filter((friend) => friend.id === currentChat)[0]
                          .url
                      );
                    } else {
                      return createOutgoingMessage(
                        chat.message,
                        chat.time,
                        chat.date
                      );
                    }
                  })}
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <input
                    type="text"
                    class="write_msg"
                    placeholder="Type a message"
                  />
                  <button
                    class="msg_send_btn"
                    type="button"
                    style={{ outline: "none" }}
                  >
                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
