/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from "react";
import { idUniqueV2 } from "id-unique-protocol";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";
import { ContactInfoComponent } from "../components/ContactInfoComponent";
import { ContactMessageComponent } from "../components/ContactMessageComponent";
import { MessageInputComponent } from "../components/MessageInputComponent";
import { socket } from "../libs/SocketIO";

// Interfaces
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IMessageQuery } from "../../interfaces/queries/IMessageQuery";

// CSS
import "./styles/ChatSubPage.scss";

export function ChatSubPage({
  loggedContactDataStateProp,
  findChatByIDUsecase,
  selectedChatId,
}: {
  loggedContactDataStateProp: [
    IContactQuery | null,
    React.Dispatch<React.SetStateAction<IContactQuery | null>>,
  ];
  findChatByIDUsecase: IFindChatByID;
  selectedChatId: string | undefined;
}) {
  // useEffect duplicado
  const [loggedContactDataState, setLoggedContactDataStateProp] =
    loggedContactDataStateProp;
  const [selectedChatDataState, setSelectedChatDataState] =
    useState<IChatQuery | null>(null);

  const [realTimeMessagesState, setRealTimeMessagesState] = useState<
    IMessageQuery[]
  >([]);

  useLoadSelectedChat(
    setSelectedChatDataState,
    findChatByIDUsecase,
    selectedChatId as string,
  );

  useListenNewMessages(setRealTimeMessagesState);

  function addSelfMessageToRealtimeMessages(message: IMessageQuery) {
    setRealTimeMessagesState((oldState) => [...oldState, message]);
  }

  return (
    <main>
      {selectedChatDataState && loggedContactDataState && selectedChatId ? (
        <>
          <div className="chatContent__main__chatHeader">
            <div className="coverBack"></div>
            <ContactInfoComponent selectedChat={selectedChatDataState} />
            <br />
            <hr />
          </div>
          <div className="chatContent__main__chatContent">
            {selectedChatDataState.messages.map((message) => (
              <ContactMessageComponent
                key={idUniqueV2()}
                contactLogged={loggedContactDataState}
                chatContacts={selectedChatDataState.contacts}
                message={message}
              />
            ))}
            {
              // Pode trocar o id pelo proprio id da mensagem
              realTimeMessagesState.map((message) => (
                <ContactMessageComponent
                  key={idUniqueV2()}
                  contactLogged={loggedContactDataState}
                  chatContacts={selectedChatDataState.contacts}
                  message={message}
                />
              ))
            }
          </div>

          <MessageInputComponent
            selectedChatId={selectedChatId}
            addSelfMessageToRealtimeMessages={addSelfMessageToRealtimeMessages}
            loggedContactDataState={loggedContactDataState}
          />
        </>
      ) : (
        <div></div>
      )}
    </main>
  );
}

function useLoadSelectedChat(
  setSelectedChatDataState: Dispatch<React.SetStateAction<IChatQuery | null>>,
  findChatByIDUsecase: IFindChatByID,
  selectedChatId: string,
) {
  useEffect(() => {
    async function loadSelectedChatData() {
      const chat = await findChatByIDUsecase.Handler(selectedChatId as string);
      setSelectedChatDataState(chat);
    }

    loadSelectedChatData();
  });
}

function useListenNewMessages(
  setRealTimeMessagesState: Dispatch<React.SetStateAction<IMessageQuery[]>>,
) {
  useEffect(() => {
    onMessageListener();
    function onMessageListener() {
      socket.off("message_receive"); // Para de ouvir tal evento
      socket.on("message_receive", (messageJustReceived: IMessageQuery) => {
        setRealTimeMessagesState((oldState) => [
          ...oldState,
          messageJustReceived,
        ]);
      });
    }
  }, []);
}
