import React from "react";
import { v4 as uuidv4 } from "uuid";

const createOutgoingMessage = (message, time, date) => {
  return (
    <div className="outgoing_msg" key={uuidv4()}>
      <div className="sent_msg">
        <p>{message}</p>
        <span className="time_date">
          {" "}
          {time} | {date}
        </span>
      </div>
    </div>
  );
};

export default createOutgoingMessage;
