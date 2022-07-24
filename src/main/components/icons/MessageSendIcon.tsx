import React from "react";

function MessageSendIcon({
  sendTextMessageFunc,
}: {
  sendTextMessageFunc: (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.KeyboardEvent<SVGSVGElement>,
  ) => void;
}) {
  return (
    <svg
      className="messageSendIcon"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="40"
      fill="none"
      viewBox="0 0 36 40"
      onClick={(e) => sendTextMessageFunc(e)}
    >
      <rect width="35.241" height="40" x="0.181" fill="#5D5FEF" rx="10"></rect>
      <path
        fill="#fff"
        d="M11 29l18.493-9L11 11l-.008 7 13.215 2-13.216 2 .01 7z"
      ></path>
    </svg>
  );
}

export default MessageSendIcon;
