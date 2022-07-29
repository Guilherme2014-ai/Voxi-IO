/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, useEffect, useState } from "react";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { ICreateNewChat } from "../../interfaces/usecases/ICreateNewChat";
import { ChatCardComponent } from "../components/ChatCardComponent";
import { ChatSearchIcon } from "../components/icons/ChatSearchIcon";

// CSS
import "./styles/ChatListSubPage.scss";

export function ChatListSubPage({
  loggedContactDataStateProp,
  selectedChatId,
  isMobilePageModeStateProp,
  createNewChat,
}: {
  loggedContactDataStateProp: [
    IContactQuery | null,
    React.Dispatch<React.SetStateAction<IContactQuery | null>>,
  ];
  isMobilePageModeStateProp: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
  selectedChatId: string | undefined;
  createNewChat: ICreateNewChat;
}) {
  const [newContactFieldState, setNewContactFieldState] = useState("");
  const [loggedContactDataState, setLoggedContactDataState] =
    loggedContactDataStateProp;
  const [chatsState, setChatsState] = useState<IChatQuery[] | undefined>(
    loggedContactDataState?.chats,
  );

  useEffect(() => {
    setChatsState(loggedContactDataState?.chats);
  }, [loggedContactDataState]);

  return (
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
                placeholder="Contact Number or Username"
                onChange={(e) => setNewContactFieldState(e.target.value)}
                value={newContactFieldState}
              />
            </div>
            <button
              onClick={(e) =>
                addNewContact(
                  e,
                  chatsState,
                  setChatsState,
                  setNewContactFieldState,
                  newContactFieldState,
                  loggedContactDataState,
                  createNewChat,
                )
              }
            >
              CHAT +
            </button>
          </form>
        </div>

        <div className="aside_content__chats">
          {chatsState && loggedContactDataState ? (
            <div>
              {chatsState.map((chat) => {
                const isSelected = chat.id === selectedChatId;

                return (
                  <ChatCardComponent
                    key={chat.id}
                    chat={chat}
                    isMobilePageModeStateProp={isMobilePageModeStateProp}
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
  );
}

async function addNewContact(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  chatsState: IChatQuery[] | undefined,
  setChatsState: Dispatch<React.SetStateAction<IChatQuery[] | undefined>>,
  setNewContactFieldStateParam: Dispatch<React.SetStateAction<string>>,
  newContactFieldStateParam: string,
  loggedContactDataState: IContactQuery | null,
  createNewChatUsecase: ICreateNewChat,
) {
  try {
    e.preventDefault();

    let contactReceiverNumber: number | null = Number(
      newContactFieldStateParam,
    );
    let contactReceiverUsername: string | null = newContactFieldStateParam;

    const isNewContactFieldStateNumber =
      contactReceiverNumber - contactReceiverNumber === 0;

    if (!isNewContactFieldStateNumber) {
      contactReceiverNumber = null;
    } else {
      contactReceiverUsername = null;
    }

    const chatCreated = await createNewChatUsecase.Handler(
      loggedContactDataState?.id as string,
      contactReceiverUsername,
      contactReceiverNumber,
    );

    setNewContactFieldStateParam("");

    const updatedChats: IChatQuery[] = [
      ...(chatsState as IChatQuery[]),
      chatCreated,
    ];

    setChatsState(updatedChats);
  } catch (e) {
    alert(e);
  }
}
