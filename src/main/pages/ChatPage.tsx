import { idUniqueV2 } from "id-unique-protocol";
import React, { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { ChatCardComponent } from "../components/ChatCardComponent";
import { ChatPageNavBarComponent } from "../components/ChatPageNavBarComponent";
import { ContactInfoComponent } from "../components/ContactInfoComponent";
import { ContactMessageComponent } from "../components/ContactMessageComponent";
import { ChatSearchIcon } from "../components/icons/ChatSearchIcon";

// CSS
import "./styles/ChatPage.scss";

/*
  Get All Chats não é o use case certo, pois não queremos que um contato veja a conversa de todos os contatos.
  Então deverá ser feito uma requisição do user logado e através de tal tabela pegar os chats relacionados.
*/

export function ChatPage({
  findContactByUsernameUsecase,
  findChatByIDUsecase,
  createMessageUsecase,
}: IChatPage) {
  const { chat_id: selectedChatId } = useParams<{ chat_id: string }>();

  const [loggedContactDataState, setLoggedContactDataState] =
    useState<IContactQuery | null>(null);
  const [selectedChatDataState, setSelectedChatDataState] =
    useState<IChatQuery | null>(null);

  /*useEffect(() => {
    async function test() {
      if (selectedChatId) {
        const messageCreated = await createMessageUsecase.Handle(
          "Messagem nova",
          "guilherme-henrique8845",
          selectedChatId,
        );
      }
    }

    window.addEventListener("click", test);
  }, []);*/

  useLoadSelectedChat(
    setSelectedChatDataState,
    findChatByIDUsecase,
    selectedChatId as string,
  );

  useLoadLoggedContactData(
    setLoggedContactDataState,
    findContactByUsernameUsecase,
  );

  if (loggedContactDataState)
    localStorage.setItem(
      "loggedContact",
      JSON.stringify(loggedContactDataState),
    );

  return (
    <div className="ChatPage">
      <header>
        <ChatPageNavBarComponent />
      </header>

      <div className="ChatPage__content">
        <aside>
          <div className="aside_content">
            <h2>Messages</h2>

            <div className="aside_content__searchGroup">
              <form>
                <div className="aside_content__inputArea">
                  <ChatSearchIcon />
                  <input
                    type="text"
                    className="aside_content__inputArea"
                    name="aside_content__inputArea"
                    id="aside_content__inputArea"
                  />
                </div>
                <button>CHAT +</button>
              </form>
            </div>

            <div className="aside_content__chats">
              {loggedContactDataState ? (
                <div>
                  {loggedContactDataState.chats.map((chat) => {
                    const isSelected = chat.id === selectedChatId;

                    return (
                      <ChatCardComponent
                        key={chat.id}
                        chat={chat}
                        loggedContactUsername={loggedContactDataState.username}
                        isSelected={isSelected}
                      />
                    );
                  })}
                </div>
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </aside>
        <main>
          {selectedChatDataState && loggedContactDataState ? (
            <>
              <div className="chatContent__main__chatHeader">
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
            </>
          ) : (
            <div>
              <h1>ssss</h1>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function useLoadLoggedContactData(
  setLoggedContactDataState: Dispatch<
    React.SetStateAction<IContactQuery | null>
  >,
  findContactByUsernameUsecase: IFindContactByUsername,
) {
  useEffect(() => {
    async function loadLoggedContact() {
      const userLoggedUsername = "guilherme-henrique8845"; // Esta informação será tirada do localStorage
      const loggedContact = await findContactByUsernameUsecase.Handler(
        userLoggedUsername,
      );

      setLoggedContactDataState(loggedContact);
    }

    loadLoggedContact();
  }, []);
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
