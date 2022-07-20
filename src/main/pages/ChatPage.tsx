import React, { Dispatch, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { ChatCardComponent } from "../components/ChatCardComponent";
import { ChatPageNavBarComponent } from "../components/ChatPageNavBarComponent";
import ChatSearch from "../components/icons/ChatSearch";

// CSS
import "./styles/ChatPage.scss";

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
  const { chat_id: selectedChatId } = useParams<{ chat_id: string }>();

  const [selectedChatDataState, setSelectedChatDataState] =
    useState<IChatQuery | null>(null);

  useLoadSelectedChat(
    setSelectedChatDataState,
    findChatByIDUsecase,
    selectedChatId as string,
  );

  useLoadLoggedContactData(
    setLoggedContactDataState,
    findContactByUsernameUsecase,
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
                  <ChatSearch />
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
  selectedChatId: string,
) {
  useEffect(() => {
    async function loadSelectedChatData() {
      const chat = await findChatByIDUsecase.Handler(selectedChatId as string);

      setSelectedChatDataState(chat);
    }

    loadSelectedChatData();
  }, []);
}

const ChangerSelectedChat =
  (navigate: NavigateFunction) => (clickedChatId: string) =>
    navigate(`/chat/${clickedChatId}`);
