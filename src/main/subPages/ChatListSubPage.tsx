import React from "react";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { ChatCardComponent } from "../components/ChatCardComponent";
import { ChatSearchIcon } from "../components/icons/ChatSearchIcon";

// CSS
import "./styles/ChatListSubPage.scss";

export function ChatListSubPage({
  loggedContactDataStateProp,
  selectedChatId,
  isMobilePageModeStateProp,
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
}) {
  const [loggedContactDataState, setLoggedContactDataStateProp] =
    loggedContactDataStateProp;

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
