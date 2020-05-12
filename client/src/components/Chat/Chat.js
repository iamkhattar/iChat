import React, { useState, useEffect } from "react";
import "./Chat.css";

import createIncomingMessage from "../Messages/IncomingMessage";
import createOutgoingMessage from "../Messages/OutgoingMessage";

import { Redirect } from "react-router-dom";

const Chat = () => {
  const [friends, setFriends] = useState([
    {
      id: "id1",
      name: "Shivam Khattar",
      url: "https://ptetutorials.com/images/user-profile.png",
      messages: [
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non quam sed ligula cursus ultricies. Vestibulum ut iaculis justo, ac tincidunt diam.",
          type: "in",
          date: "Oct 25",
          time: "12:00pm",
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non quam sed ligula cursus ultricies. Vestibulum ut iaculis justo, ac tincidunt diam.",
          type: "out",
          date: "Oct 25",
          time: "12:01pm",
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non quam sed ligula cursus ultricies. Vestibulum ut iaculis justo, ac tincidunt diam.",
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
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non quam sed ligula cursus ultricies. Vestibulum ut iaculis justo, ac tincidunt diam.",
          type: "in",
          date: "Oct 25",
          time: "12:00pm",
        },
        {
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non quam sed ligula cursus ultricies. Vestibulum ut iaculis justo, ac tincidunt diam.",
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentChat, setCurrentChat] = useState("id1");

  const handleChangeChat = (id) => {
    setCurrentChat(id);
  };

  useEffect(() => {
    handleChangeChat(friends[0].id);
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

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
        className={style}
        style={{ border: "0px", outline: "none" }}
        onClick={(e) => handleChangeChat(id)}
        key={id}
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
      <div className="container row align-items-center h-100 justify-content-center">
        <div className="messaging">
          <h1 className="text-center">iChat</h1>
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar text-left"
                      placeholder="Add a Contact"
                    />
                    <span className="input-group-addon">
                      <button type="button" style={{ outline: "none" }}>
                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                {friends.map((friend) => {
                  const lastMessage = friend.messages[0].message;
                  const message =
                    lastMessage.length > 50
                      ? lastMessage.substring(0, 50) + "..."
                      : lastMessage;
                  return createRecentContact(
                    friend.id,
                    friend.name,
                    friend.messages[0].date,
                    message,
                    friend.url,
                    friend.id === currentChat
                  );
                })}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
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
              <form
                className="type_msg"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Hi");
                }}
              >
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                  />
                  <button
                    className="msg_send_btn"
                    type="submit"
                    style={{ outline: "none" }}
                  >
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
