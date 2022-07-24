import React, { useContext } from "react";
import { ICreateNewMessage } from "../../interfaces/usecases/CreateNewMessage";

const SendMessageUsecaseContext = React.createContext<ICreateNewMessage | null>(
  null,
);
const getSendMessageUsecaseContextValue = () =>
  useContext(SendMessageUsecaseContext);

export { SendMessageUsecaseContext, getSendMessageUsecaseContextValue };
