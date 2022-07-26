import React from "react";
import Avatar from "@mui/material/Avatar";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { contactChatByUsername } from "../../factories/contactChatByUsername";

// CSS
import "./styles/ContactInfoComponent.scss";

export function ContactInfoComponent({
  selectedChat,
}: {
  selectedChat: IChatQuery;
}) {
  // console.log(selectedChat);
  // Melhorar isso fazendo uma class que chama isso ou sei la
  const loggedContactLocalStorage = localStorage.getItem(
    "contact_username",
  ) as string;

  const contactChat = contactChatByUsername(
    selectedChat.contacts,
    loggedContactLocalStorage,
  );

  return (
    <div className="contactInfo">
      <Avatar alt="Contact Chat" src={contactChat.profile_picture_url} />
      <div className="contactInfo__name-bio">
        <h1>{contactChat.name}</h1>
        <p>{contactChat.bio}</p>
      </div>
    </div>
  );
}
