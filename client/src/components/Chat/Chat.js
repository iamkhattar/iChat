import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

import createIncomingMessage from "../Messages/IncomingMessage";
import createOutgoingMessage from "../Messages/OutgoingMessage";

import ScrollToBottom from "react-scroll-to-bottom";

import { Redirect } from "react-router-dom";

import { Overlay, Popover } from "react-bootstrap";

import axios from "axios";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const [friends, setFriends] = useState([]);
  const [currentChat, setCurrentChat] = useState("");

  socket = io("http://localhost:5000/");

  useEffect(() => {
    const checkIfTokenIsValid = async () => {
      const token = localStorage.getItem("x-auth-token");
      try {
        const config = {
          headers: {
            "x-auth-token": token,
          },
        };
        const res = await axios.get("/api/fetch", config);
        setFriends(res.data);
        if (res.data.length > 0) setCurrentChat(res.data[0].id);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      setIsAuthenticated(false);
    }
    checkIfTokenIsValid();

    socket.emit("login", token);

    socket.on("newMessage", (message) => {
      setFriends(message);
    });
  }, []);

  const handleChangeChat = (id) => {
    setCurrentChat(id);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [contact, setContact] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [popupMsg, setPopupMsg] = useState("");
  const [message, setMessage] = useState("");

  const handleAddFriend = async (event) => {
    if (contact === "") return;
    setTarget(event.target);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      };
      const body = JSON.stringify({ friend: contact });

      const res = await axios.post("/api/friends", body, config);
      setShow(!show);
      setPopupMsg("Friend Request Sent");
      socket.emit("getMessages", localStorage.getItem("x-auth-token"));
      setContact("");
    } catch (err) {
      setPopupMsg(err.response.data.errors[0].msg);
      setShow(!show);
    }
    return setTimeout(() => setShow(false), 3000);
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("x-auth-token");
    const receiver = currentChat;

    socket.emit("sendMessage", { token, receiver, message });
    setMessage("");
    socket.emit("getMessages", token);
  };

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
                      className="search-bar text-left pr-5"
                      placeholder="Add a Contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <span className="input-group-addon">
                      <Overlay
                        show={show}
                        target={target}
                        placement="top"
                        container={ref.current}
                        containerPadding={20}
                      >
                        <Popover id="popover-contained">
                          <Popover.Title as="h3">Friend Request</Popover.Title>
                          <Popover.Content>{popupMsg}</Popover.Content>
                        </Popover>
                      </Overlay>
                      <button
                        type="button"
                        style={{ outline: "none" }}
                        onClick={handleAddFriend}
                      >
                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                {friends.length > 0 &&
                  friends.map((friend) => {
                    if (friend.messages.length > 0) {
                      const lastMessage =
                        friend.messages[friend.messages.length - 1].message;
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
                    } else {
                      const lastMessage = "";
                      return createRecentContact(
                        friend.id,
                        friend.name,
                        "",
                        "",
                        friend.url.substring(),
                        friend.id === currentChat
                      );
                    }
                  })}
              </div>
            </div>
            <div className="mesgs">
              <ScrollToBottom className="msg_history">
                {currentChat !== "" &&
                  friends
                    .filter((friend) => friend.id === currentChat)[0]
                    .messages.map((chat) => {
                      if (chat.type === "in") {
                        return createIncomingMessage(
                          chat.message,
                          chat.time,
                          chat.date,
                          friends.filter(
                            (friend) => friend.id === currentChat
                          )[0].url
                        );
                      } else {
                        return createOutgoingMessage(
                          chat.message,
                          chat.time,
                          chat.date
                        );
                      }
                    })}
              </ScrollToBottom>
              <form
                className="type_msg"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
