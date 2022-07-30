import React, { Dispatch, useEffect } from "react";

// Components
import Avatar from "@mui/material/Avatar";

// Interfaces
import { IMessageQuery } from "../../interfaces/queries/IMessageQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";

// Factories
import { contactSenderDataByUsername } from "../../factories/contactSenderDataByUsername";

// CSS
import "./styles/contactMessageComponent.scss";
import { socket } from "../libs/SocketIO";

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
    message.contactSenderId,
    chatContacts,
  );

  const isContactLoggedMessage = contactSender?.id == contactLogged.id;

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
        {contactSender && (
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
        )}
      </div>
    </div>
  );
}
