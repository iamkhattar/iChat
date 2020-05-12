import React from "react";
import { v4 as uuidv4 } from "uuid";

const createIncomingMessage = (message, time, date, profilePicture) => {
  return (
    <div className="incoming_msg" key={uuidv4()}>
      <div className="incoming_msg_img">
        <img src={profilePicture} alt={profilePicture} />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{message}</p>
          <span className="time_date">
            {" "}
            {time} | {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default createIncomingMessage;
