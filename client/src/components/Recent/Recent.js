import React from "react";

const createRecentContact = (name, date, message, profilePicture, active) => {
  var style;
  if (active) {
    style = "chat_list active_chat";
  } else {
    style = "chat_list";
  }
  return (
    <div class={style}>
      <div class="chat_people">
        <div class="chat_img">
          <img src={profilePicture} alt={name} />
        </div>
        <div class="chat_ib">
          <h5>
            {name} <span class="chat_date">{date}</span>
          </h5>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default createRecentContact;
