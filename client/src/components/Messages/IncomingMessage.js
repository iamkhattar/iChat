import React from "react";

const createIncomingMessage = (message, time, date, profilePicture) => {
  return (
    <div class="incoming_msg">
      <div class="incoming_msg_img">
        <img src={profilePicture} alt={profilePicture} />
      </div>
      <div class="received_msg">
        <div class="received_withd_msg">
          <p>{message}</p>
          <span class="time_date">
            {" "}
            {time} | {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default createIncomingMessage;
