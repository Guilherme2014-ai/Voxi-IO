import React from "react";
import Avatar from "@mui/material/Avatar";

// Interfaces
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
/*
// Factories
import { contactChatByUsername } from "../../factories/contactChatByUsername";*/

// CSS
import "./styles/ChatCard.scss";
import { NavigateFunction, useNavigate } from "react-router";
import { LastMessageComponent } from "./LastMessageComponent";
import { contactChatByUsername } from "../../factories/contactChatByUsername";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";

export function ChatCardComponent({
  chat,
  loggedContactUsername,
  isSelected,
}: {
  chat: IChatQuery;
  loggedContactUsername: string;
  isSelected: boolean;
}) {
  // Quado este component carregar tenho certeza de que o localStorage não estará vazio
  const locaStorageLoggedContact = JSON.parse(
    localStorage.getItem("loggedContact") as any,
  ) as IContactQuery;

  const contactChat = contactChatByUsername(
    chat.contacts,
    locaStorageLoggedContact.username,
  );

  const navigate = useNavigate();
  const setSelectedChat = ChangerSelectedChat(navigate);

  /*const messages = chat.messages;
  const lastMessage = messages[messages.length - 1].text || "";*/

  return (
    <div className="chatCard" onClick={() => setSelectedChat(chat.id)}>
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
        messageText={"Oi Sumido, como vai ?"}
      />
    </div>
  );
}

const ChangerSelectedChat =
  (navigate: NavigateFunction) => (clickedChatId: string) =>
    navigate(`/chat/${clickedChatId}`);
