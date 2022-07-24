import React, { useState } from "react";
import { getSendMessageUsecaseContextValue } from "../../adapters/context/SendMessageUsecase";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { ICreateNewMessage } from "../../interfaces/usecases/CreateNewMessage";
import MessageClips from "./icons/MessageClips";
import MessageSendIcon from "./icons/MessageSendIcon";

import "./styles/MessageInputComponent.scss";

export function MessageInputComponent({
  selectedChatId,
  loggedContactDataState,
}: {
  selectedChatId: string;
  loggedContactDataState: IContactQuery;
}) {
  const sendMessageUsecase =
    getSendMessageUsecaseContextValue() as ICreateNewMessage;
  const [messageTextFieldState, setMessageTextFieldState] = useState("");

  function messageTextFieldStateChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;

    setMessageTextFieldState(value);
  }
  async function sendTextMessage(
    e: React.MouseEvent | React.KeyboardEvent,
    textMessage: string,
  ) {
    e.preventDefault();
    setMessageTextFieldState("");

    try {
      await sendMessageUsecase.Handle(
        textMessage,
        loggedContactDataState.username,
        selectedChatId,
      );
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <div className="messageInputArea">
      <form className="messageInputArea__messageInputForm">
        <input
          type="text"
          className="messageInputArea__messageInputForm__input"
          name="messageInputArea__messageInputForm__input"
          value={messageTextFieldState}
          id="messageInputArea__messageInputForm__input"
          onKeyDown={(e) => {
            if (e.key == "Enter") sendTextMessage(e, messageTextFieldState);
          }}
          onChange={(e) => messageTextFieldStateChangeHandler(e)}
        />
        <div className="messageInputArea__messageInputForm__messageOptions">
          <MessageSendIcon
            sendTextMessageFunc={(e) =>
              sendTextMessage(e, messageTextFieldState)
            }
          />
          <MessageClips />
        </div>
      </form>
    </div>
  );
}
