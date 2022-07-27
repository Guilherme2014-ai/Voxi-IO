import React from "react";
import Avatar from "@mui/material/Avatar";
import { NavigateFunction, useNavigate } from "react-router";

// Interfaces
import { IChatQuery } from "../../interfaces/queries/IChatQuery";

// Factories
import { LastMessageComponent } from "./LastMessageComponent";
import { contactChatByUsername } from "../../factories/contactChatByUsername";

// CSS
import "./styles/ChatCard.scss";

export function ChatCardComponent({
  chat,
  loggedContactUsername,
  isMobilePageModeStateProp,
  isSelected,
}: {
  chat: IChatQuery;
  loggedContactUsername: string;
  isMobilePageModeStateProp: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
  isSelected: boolean;
}) {
  const [isMobilePageModeState, setIsMobilePageModeState] =
    isMobilePageModeStateProp;
  const contactChat = contactChatByUsername(
    chat.contacts,
    loggedContactUsername,
  );

  const navigate = useNavigate();
  const setSelectedChat = ChangerSelectedChat(navigate);

  const messages = chat.messages;
  const lastMessage =
    messages.length > 1
      ? `${messages[messages.length - 1].text.substring(4)}...`
      : "";

  const selectConfig: React.CSSProperties | undefined = isSelected
    ? {
        boxShadow: "#7879F1 0px 0px 8px",
        transform: "scale(1.1)",
      }
    : {};

  return (
    <div
      className="chatCard"
      onClick={() => setSelectedChat(chat.id, setIsMobilePageModeState)}
      style={{ ...selectConfig }}
    >
      <div className="chatCard__contactInfo">
        <div className="chatCard__contactInfo__avatarArea">
          <Avatar
            alt="Contact Avatar"
            src={contactChat.profile_picture_url}
            style={{
              width: "30px",
              height: "30px",
            }}
          />{" "}
        </div>
        <span>{contactChat.name}</span>
      </div>

      <LastMessageComponent
        isTextMessageType={true}
        messageText={lastMessage}
      />
    </div>
  );
}

const ChangerSelectedChat =
  (navigate: NavigateFunction) =>
  (
    clickedChatId: string,
    setIsMobilePageModeState: React.Dispatch<React.SetStateAction<boolean>>,
  ) =>
    navigate(`/chat/${clickedChatId}/chat`);
