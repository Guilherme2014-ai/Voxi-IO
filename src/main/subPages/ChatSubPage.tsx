import React, { Dispatch, useEffect, useState } from "react";
import { idUniqueV2 } from "id-unique-protocol";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";
import { ContactInfoComponent } from "../components/ContactInfoComponent";
import { ContactMessageComponent } from "../components/ContactMessageComponent";
import { MessageInputComponent } from "../components/MessageInputComponent";

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
  const [loggedContactDataState, setLoggedContactDataStateProp] =
    loggedContactDataStateProp;
  const [selectedChatDataState, setSelectedChatDataState] =
    useState<IChatQuery | null>(null);

  useLoadSelectedChat(
    setSelectedChatDataState,
    findChatByIDUsecase,
    selectedChatId as string,
  );

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
          </div>

          <MessageInputComponent
            selectedChatId={selectedChatId}
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
