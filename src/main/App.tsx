import React from "react";

// Dependencies
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { getProviderValue } from "../adapters/context/UsecasesContext";

// Components
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
// import { LoginPage } from "./pages/LoginPage";

// CSS
import "./style/app.scss";

function App() {
  // Pega valor do Provider
  const {
    findContactByUsernameUsecase,
    findChatByIDUsecase,
    createMessageUsecase,
    createNewContactUsecase,
    userAuthenticator,
    createNewChat,
  } = getProviderValue();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                createNewContactUsecase={createNewContactUsecase}
                userAuthenticator={userAuthenticator}
                findUserByUsernameUsename={findContactByUsernameUsecase}
              />
            }
          />
          <Route
            path="chat/:chat_id/:page_priority"
            element={
              <ChatPage
                createNewChat={createNewChat}
                findContactByUsernameUsecase={findContactByUsernameUsecase}
                findChatByIDUsecase={findChatByIDUsecase}
                createMessageUsecase={createMessageUsecase}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
