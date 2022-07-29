import React, { Dispatch, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { SendMessageUsecaseContext } from "../../adapters/context/SendMessageUsecase";
import { socket } from "../libs/SocketIO";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { ChatPageNavBarComponent } from "../components/ChatPageNavBarComponent";
import { ChatListSubPage } from "../subPages/ChatListSubPage";
import { ChatSubPage } from "../subPages/ChatSubPage";

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
  createNewChat,
}: IChatPage) {
  const { chat_id: selectedChatId } = useParams<{ chat_id: string }>();
  const { page_priority: pagePriority } = useParams<{
    page_priority: "chat" | "chatList";
  }>();

  const navigate = useNavigate();

  const [isMobilePageMode, setIsMobilePageMode] = useState<boolean>(false);
  const [loggedContactDataState, setLoggedContactDataState] =
    useState<IContactQuery | null>(null);

  useLoadLoggedContactData(
    setLoggedContactDataState,
    navigate,
    findContactByUsernameUsecase,
  );

  // Nem valeu tanto a pena criar um context aqui, só confundi, deixando a questão, porque ?

  useEffect(() => {
    socket.emit("message_join", loggedContactDataState?.chats);
    setTimeout(() => {
      socket.emit(
        "contactConnect",
        loggedContactDataState?.name,
        loggedContactDataState?.chats,
      );
    }, 300);

    // Se estiver na lista de contatos, irá receber.
    socket.on("contactGetOn", (contactName: string) => {
      alert(`${contactName} está online`);
    });
  }, [loggedContactDataState]);

  useEffect(() => {
    setPagePriority();
    window.addEventListener("resize", setPagePriority);

    function setPagePriority() {
      const pageWidth = window.innerWidth;
      const limit = 958;

      const underLimit = pageWidth < limit;

      setIsMobilePageMode(underLimit);
    }
  }, []);

  const subPages = {
    chatList: (
      <ChatListSubPage
        loggedContactDataStateProp={[
          loggedContactDataState,
          setLoggedContactDataState,
        ]}
        isMobilePageModeStateProp={[isMobilePageMode, setIsMobilePageMode]}
        selectedChatId={selectedChatId}
        createNewChat={createNewChat}
      />
    ),
    chat: (
      <ChatSubPage
        loggedContactDataStateProp={[
          loggedContactDataState,
          setLoggedContactDataState,
        ]}
        findChatByIDUsecase={findChatByIDUsecase}
        selectedChatId={selectedChatId}
      />
    ),
  };

  return (
    <SendMessageUsecaseContext.Provider value={createMessageUsecase}>
      <header>
        <ChatPageNavBarComponent />
      </header>

      {isMobilePageMode ? (
        <div className="ChatPage__content">
          {pagePriority && <>{subPages[pagePriority]}</>}
        </div>
      ) : (
        <div className="ChatPage">
          <div className="ChatPage__content">
            {subPages.chatList}
            {subPages.chat}
          </div>
        </div>
      )}
    </SendMessageUsecaseContext.Provider>
  );
}

function useLoadLoggedContactData(
  setLoggedContactDataState: Dispatch<
    React.SetStateAction<IContactQuery | null>
  >,
  navigate: NavigateFunction,
  findContactByUsernameUsecase: IFindContactByUsername,
) {
  useEffect(() => {
    async function loadLoggedContact() {
      try {
        const userLoggedUsername = localStorage.getItem("contact_username"); // Esta informação será tirada do localStorage

        if (userLoggedUsername) {
          const loggedContact = await findContactByUsernameUsecase.Handler(
            userLoggedUsername,
          );

          setLoggedContactDataState(loggedContact);
        } else {
          navigate("/");
        }
      } catch (e) {
        alert(e);
        console.error(e);
      }
    }

    loadLoggedContact();
  }, []);
}
