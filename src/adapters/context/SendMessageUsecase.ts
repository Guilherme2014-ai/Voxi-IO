import React, { useContext } from "react";
import { ICreateNewMessage } from "../../interfaces/usecases/ICreateNewMessage";

const SendMessageUsecaseContext = React.createContext<ICreateNewMessage | null>(
  null,
);
const getSendMessageUsecaseContextValue = () =>
  useContext(SendMessageUsecaseContext);

export { SendMessageUsecaseContext, getSendMessageUsecaseContextValue };
