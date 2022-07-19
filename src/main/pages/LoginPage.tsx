import React from "react";

// Interfaces
import { ILoginPageProps } from "../../interfaces/components/ILoginPage";

export function LoginPage(props: ILoginPageProps) {
  const { userRepository } = props;

  function createUserHandler() {
    console.log("Calma");
  }

  return <h1 onClick={createUserHandler}>Teste</h1>;
}
