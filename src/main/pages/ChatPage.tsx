import React, { Dispatch, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import chatContactName from "../../factories/chatContactName";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";

/*
  Get All Chats não é o use case certo, pois não queremos que um contato veja a conversa de todos os contatos.
  Então deverá ser feito uma requisição do user logado e através de tal tabela pegar os chats relacionados.
*/

export function ChatPage({
  findContactByUsernameUsecase,
  findChatByIDUsecase,
}: IChatPage) {
  const navigate = useNavigate();
  const changeSelectedChat = ChangerSelectedChat(navigate);

  const [loggedContactDataState, setLoggedContactDataState] =
    useState<IContactQuery | null>(null);
  const { chat_id } = useParams<{ chat_id: string }>();

  const [selectedChatDataState, setSelectedChatDataState] =
    useState<IChatQuery | null>(null);

  useLoadSelectedChat(
    setSelectedChatDataState,
    findChatByIDUsecase,
    chat_id as string,
  );

  useLoadLoggedContactData(
    setLoggedContactDataState,
    findContactByUsernameUsecase,
  );

  console.log(selectedChatDataState);

  return (
    <div className="ChatPage">
      <header>
        <nav>n a v</nav>
      </header>

      <div className="ChatPage__content">
        <aside>
          {loggedContactDataState ? (
            <div>
              {loggedContactDataState.chats.map((chat) => {
                const contactName = chatContactName(
                  chat.contacts,
                  loggedContactDataState.name,
                );

                return (
                  <div
                    key={chat.messages[0].text}
                    onClick={() => changeSelectedChat(chat.id)}
                  >
                    <h2>{contactName}</h2>
                    <p>{chat.messages[chat.messages.length - 1].text}</p>

                    <br />
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </aside>
        <main>selectedChat</main>
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
  chat_id: string,
) {
  useEffect(() => {
    async function loadSelectedChatData() {
      const chat = await findChatByIDUsecase.Handler(chat_id as string);

      setSelectedChatDataState(chat);
    }

    loadSelectedChatData();
  }, []);
}

const ChangerSelectedChat =
  (navigate: NavigateFunction) => (clickedChatId: string) =>
    navigate(`/chat/${clickedChatId}`);
