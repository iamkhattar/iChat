import React from "react";
import "./Chat.css";

import createIncomingMessage from "../Messages/IncomingMessage";
import createOutgoingMessage from "../Messages/OutgoingMessage";
import createRecentContact from "../Recent/Recent";

const Chat = () => {
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
                      class="search-bar"
                      placeholder="Search"
                    />
                    <span class="input-group-addon">
                      <button type="button">
                        <i class="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="inbox_chat">
                {createRecentContact(
                  "Name",
                  "Dec 25",
                  "Lorem ipsum Dipsum",
                  "https://ptetutorials.com/images/user-profile.png",
                  true
                )}

                {createRecentContact(
                  "Name 2",
                  "Dec 25",
                  "Lorem ipsum Dipsum",
                  "https://ptetutorials.com/images/user-profile.png"
                )}
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                {createIncomingMessage(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus vehicula accumsan. Nulla lacinia faucibus odio, sed commodo lectus scelerisque id.",
                  "11:01 AM",
                  "Today",
                  "https://ptetutorials.com/images/user-profile.png"
                )}
                {createOutgoingMessage(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus vehicula accumsan. Nulla lacinia faucibus odio, sed commodo lectus scelerisque id.",
                  "11:01 AM",
                  "Today"
                )}
              </div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <input
                    type="text"
                    class="write_msg"
                    placeholder="Type a message"
                  />
                  <button class="msg_send_btn" type="button">
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
