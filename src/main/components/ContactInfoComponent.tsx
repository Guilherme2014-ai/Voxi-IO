import React from "react";
import Avatar from "@mui/material/Avatar";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { contactChatByUsername } from "../../factories/contactChatByUsername";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";

// CSS
import "./styles/ContactInfoComponent.scss";

export function ContactInfoComponent({
  selectedChat,
}: {
  selectedChat: IChatQuery;
}) {
  // console.log(selectedChat);
  // Melhorar isso fazendo uma class que chama isso ou sei la
  const loggedContactLocalStorage = JSON.parse(
    localStorage.getItem("loggedContact") as string,
  ) as IContactQuery;

  const contactChat = contactChatByUsername(
    selectedChat.contacts,
    loggedContactLocalStorage.username,
  );

  //console.log(selectedChat);

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
