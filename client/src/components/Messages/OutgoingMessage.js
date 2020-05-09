import React from "react";

const createOutgoingMessage = (message, time, date) => {
  return (
    <div class="outgoing_msg">
      <div class="sent_msg">
        <p>{message}</p>
        <span class="time_date">
          {" "}
          {time} | {date}
        </span>
      </div>
    </div>
  );
};

export default createOutgoingMessage;
