import React from "react";

// Dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  } = getProviderValue();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage createNewContactUsecase={createNewContactUsecase} />
            }
          />
          <Route
            path="chat/:chat_id"
            element={
              <ChatPage
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
