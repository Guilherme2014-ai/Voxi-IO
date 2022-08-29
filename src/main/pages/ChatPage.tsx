import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SendMessageUsecaseContext } from "../../adapters/context/SendMessageUsecase";
import { socket } from "../libs/SocketIO";

// Hooks
import { useLoadLoggedContactData } from "../hooks/useLoadLoggedContactDataHook";

// Components
import { OnlineContactNotificationComponent } from "../components/OnlineContactNotification";
import { ChatPageNavBarComponent } from "../components/ChatPageNavBarComponent";
import { ChatListSubPage } from "../subPages/ChatListSubPage";
import { ChatSubPage } from "../subPages/ChatSubPage";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";

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

  const [notificationState, setNotificationState] = useState<null | string>(
    null,
  );
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
    socket.off("contactGetOn");
    socket.on("contactGetOn", (contactName: string) => {
      setNotificationState(contactName);

      setTimeout(() => {
        setNotificationState(null);
      }, 2000);
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

  /*
  useEffect(() => {
    console.log("pitu");
    const rc = new RTCPeerConnection(config.iceServers);

    const dc = rc.createDataChannel("channel");

    rc.createOffer()
      .then((offer) => rc.setLocalDescription(offer))
      .then(() =>
        console.log(
          `Set Sucessfully -> Offer: ${JSON.stringify(rc.localDescription)}`,
        ),
      );
  }, [loggedContactDataState]);*/

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

      <OnlineContactNotificationComponent contactName={notificationState} />

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
