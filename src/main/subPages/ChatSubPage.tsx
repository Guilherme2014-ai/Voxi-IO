/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from "react";
import { idUniqueV2 } from "id-unique-protocol";
import { ContactInfoComponent } from "../components/ContactInfoComponent";
import { ContactMessageComponent } from "../components/ContactMessageComponent";
import { MessageInputComponent } from "../components/MessageInputComponent";
import { socket } from "../libs/SocketIO";

// Adapters
import { Caller } from "../adapters/Caller";
import { BrowserNotificator } from "../adapters/notifications/BrowserNotificator";

// Interfaces
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IMessageQuery } from "../../interfaces/queries/IMessageQuery";

// CSS
import "./styles/ChatSubPage.scss";

// Instances
const browserNotificator = new BrowserNotificator();

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

  const [onCallState, setOnCallState] = useState<boolean>(false);
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
          {!onCallState ? (
            <>
              <div className="chatContent__main__chatHeader">
                <div className="coverBack"></div>
                <ContactInfoComponent selectedChat={selectedChatDataState} />
                <button
                  onClick={() =>
                    call(
                      loggedContactDataState,
                      selectedChatDataState,
                      setOnCallState,
                    )
                  }
                >
                  Call
                </button>
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
                addSelfMessageToRealtimeMessages={
                  addSelfMessageToRealtimeMessages
                }
                loggedContactDataState={loggedContactDataState}
              />
            </>
          ) : (
            <h1>Chamada</h1>
          )}
        </>
      ) : (
        <div>
          <video autoPlay playsInline controls={false} id="webcam"></video>
        </div>
      )}
    </main>
  );
}

async function call(
  loggadContact: IContactQuery,
  selectedChatData: IChatQuery | null,
  setOnCallState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    if (selectedChatData) {
      setOnCallState(true);

      const webCamElement = document.getElementById(
        "webcam",
      ) as HTMLVideoElement;

      const caller = new Caller(selectedChatData.id);

      await caller.call(loggadContact.name);
      const localStream = await caller.setup();

      webCamElement.srcObject = localStream;
    } else {
      throw new Error("Something went wrong !");
    }
  } catch (e) {
    console.error(e);
  }
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
        browserNotificator.sendcontactMessageNotification(
          messageJustReceived.text,
        );
        setRealTimeMessagesState((oldState) => [
          ...oldState,
          messageJustReceived,
        ]);
      });
    }
  }, []);
}
