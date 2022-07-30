import React from "react";

import "./styles/NotificationComponent.scss";

export function OnlineContactNotificationComponent({
  contactName,
}: {
  contactName: string | null;
}) {
  return (
    <div
      className="notificationArea"
      style={{
        display: contactName ? "inherit" : "none",
      }}
    >
      <div className="notification">
        <div>
          <h2>{`${contactName}`}</h2>
          <span>Ficou Online</span>
        </div>
      </div>
    </div>
  );
}
