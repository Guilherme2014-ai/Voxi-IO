import React from "react";
import Avatar from "@mui/material/Avatar";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";

import "./styles/contactMessageComponent.scss";
import { contactSenderDataByUsername } from "../../factories/contactSenderDataByUsername";
import { IMessageQuery } from "../../interfaces/queries/IMessageQuery";

export function ContactMessageComponent({
  contactLogged,
  chatContacts,
  message,
}: {
  contactLogged: IContactQuery;
  chatContacts: IContactQuery[];
  message: IMessageQuery;
}) {
  const contactSender = contactSenderDataByUsername(
    message.contactSenderUsername,
    chatContacts,
  );

  const isContactLoggedMessage =
    contactSender?.username == contactLogged.username;

  const styleConfig: React.CSSProperties | undefined = isContactLoggedMessage
    ? {
        color: "white",
      }
    : {
        color: "#7879F1",
        flexDirection: "row-reverse",
      };

  return (
    <div className="contactMessageArea">
      <div
        className="contactMessage"
        style={{
          display: "flex",
          ...styleConfig,
        }}
      >
        {contactSender ? (
          <>
            <Avatar
              src={contactSender.profile_picture_url}
              style={{
                width: "30px",
                height: "30px",
              }}
            />
            <div
              className="contactMessage__contentArea"
              style={{
                backgroundColor: isContactLoggedMessage ? "#7879F1" : "",
              }}
            >
              <p className="contactMessage__content">{message.text}</p>
            </div>
          </>
        ) : (
          <span>Error</span>
        )}
      </div>
    </div>
  );
}
