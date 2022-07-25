import React, { useEffect } from "react";

// Interfaces
import { ILoginPageProps } from "../../interfaces/components/ILoginPage";

export function LoginPage({ createNewContactUsecase }: ILoginPageProps) {
  useEffect(() => {
    async function createNewContactTest() {
      const contact = await createNewContactUsecase.Handler();

      console.log(contact);
    }

    window.addEventListener("click", createNewContactTest);
  }, []);

  return <h1>Login Page</h1>;
}
