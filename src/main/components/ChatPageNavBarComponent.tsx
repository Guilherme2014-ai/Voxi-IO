import React from "react";
import ContactNotificationsIcon from "./icons/ContactNotificationsIcon";
import ContactPerfilIcon from "./icons/ContactPerfilIcon";
import ContactPerfil from "./icons/ContactPerfilIcon";

// CSS
import "./styles/ChatPageNavBar.scss";

export function ChatPageNavBarComponent() {
  return (
    <nav className="chatPageNavBar">
      <div className="chatPageNavBar__icons">
        <div>
          <ContactNotificationsIcon />
        </div>
        <div>
          <ContactPerfilIcon />
        </div>
      </div>
    </nav>
  );
}
