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

export function ChatCardComponent({
  chat,
  loggedContactUsername,
  isSelected,
}: {
  chat: IChatQuery;
  loggedContactUsername: string;
  isSelected: boolean;
}) {
  /*
    const contactChat = chatContactName(
                    chat.contacts,
                    loggedContactDataState.name,
                  );
    */
  const contact = chat.contacts[0];
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
            src={contact.profile_picture_url}
            style={{
              width: "30px",
              height: "30px",
            }}
          />{" "}
        </div>
        <span>{contact.name}</span>
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
