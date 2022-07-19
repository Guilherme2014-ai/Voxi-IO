/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloProvider } from "@apollo/client";
import React, { useContext } from "react";
import ReactDOM from "react-dom/client";

// Lib's
import { apolloClient } from "../libs/ApolloLib";

// Components
import App from "./App";

// CSS
import "./style/global.scss";

// Other
import { makeUsecasesContext } from "./factories/makeContext";
const { context, value } = makeUsecasesContext();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <context.Provider value={value}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </context.Provider>
  </React.StrictMode>,
);
