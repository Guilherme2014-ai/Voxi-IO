import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// Interfaces
import { IChatPage } from "../../interfaces/components/IChatPage";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";

/*
  Get All Chats não é o use case certo, pois não queremos que um contato veja a conversa de todos os contatos.
  Então deverá ser feito uma requisição do user logado e através de tal tabela pegar os chats relacionados.
*/

export function ChatPage({ findAllChats }: IChatPage) {
  const { chat_id } = useParams<{ chat_id: string }>();

  const [allChats, setAllChats] = useState<IChatQuery[]>([]);

  useEffect(() => {
    async function loadChats() {
      const chats = await (await findAllChats.Handle())();

      setAllChats(chats);
    }

    loadChats();
  }, []);

  console.log(allChats);

  return (
    <div className="ChatPage">
      <header>
        <nav>n a v</nav>
      </header>

      <div className="ChatPage__content">
        <aside>chats</aside>
        <main>selectedChat</main>
      </div>
    </div>
  );
}
