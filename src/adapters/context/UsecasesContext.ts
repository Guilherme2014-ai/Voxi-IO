import React, { useContext } from "react";
import { IUsecasesContext } from "../../interfaces/context/IUsecasesContext";

// Any por enquanto

const context = React.createContext<IUsecasesContext | null>(null);
const getProviderValue = () => useContext(context) as IUsecasesContext;

export { context, getProviderValue };
