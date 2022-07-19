import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import chatContactName from "../../factories/chatContactName";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";

/*
  Get All Chats não é o use case certo, pois não queremos que um contato veja a conversa de todos os contatos.
  Então deverá ser feito uma requisição do user logado e através de tal tabela pegar os chats relacionados.
*/

export function ChatPage({ findContactByUsernameUsecase }: IChatPage) {
  const { chat_id } = useParams<{ chat_id: string }>();

  const [loggedContactDataState, setLoggedContactDataState] =
    useState<IContactQuery | null>(null);

  useEffect(() => {
    async function loadLoggedContact() {
      const userLoggedUsername = "guilherme-henrique8845";
      const loggedContact = await findContactByUsernameUsecase.Handler(
        userLoggedUsername,
      );

      setLoggedContactDataState(loggedContact);
    }

    loadLoggedContact();
  }, []);

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
                  <div key={chat.messages[0].text}>
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
