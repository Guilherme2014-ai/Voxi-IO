import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router";

// Interfaces
import { ILoginPageProps } from "../../interfaces/components/ILoginPage";
import { ICreateNewContact } from "../../interfaces/usecases/CreateNewContact";
import GoogleIcon from "../components/icons/GoogleIcon";
import LogoImage from "../components/icons/LogoImage";

// CSS
import "./styles/LoginPage.scss";

export function LoginPage({ createNewContactUsecase }: ILoginPageProps) {
  const navigate = useNavigate();

  return (
    <main className="loginPage">
      <div className="loginPage__content">
        <form className="loginPage__content__form">
          <div className="loginPage__content__form__content">
            <LogoImage />

            <div className="loginPage__content__form__content__infoGroup">
              <h1>Login Area</h1>

              <input
                type="text"
                className="loginPage__content__form__content__infoGroup__LoginMethode phoneNumberLoginMethode"
                name="loginPage__content__form__content__infoGroup__LoginMethode"
                id="loginPage__content__form__content__infoGroup__LoginMethode"
                placeholder="Login with Phone's Number"
              />
              <button
                className="loginPage__content__form__content__infoGroup__LoginMethode googleLoginMethode"
                onClick={(e) =>
                  createNewContactTest(e, createNewContactUsecase, navigate)
                }
              >
                <GoogleIcon /> Login with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

async function createNewContactTest(
  e: React.MouseEvent,
  createNewContactUsecase: ICreateNewContact,
  navigate: NavigateFunction,
) {
  try {
    e.preventDefault();

    const contact = await createNewContactUsecase.Handler();
    setLocalstorageContactUsername(contact.username);

    navigate("/chat/chatid");
  } catch (e) {
    alert(e);
    console.error(e);
  }
}

function setLocalstorageContactUsername(contactUsername: string) {
  localStorage.setItem("contact_username", contactUsername);
}
