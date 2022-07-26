import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { IUserAuthenticator } from "../../interfaces/authenticators/IUserAuthenticator";

// Interfaces
import { ILoginPageProps } from "../../interfaces/components/ILoginPage";
import { ICreateNewContact } from "../../interfaces/usecases/CreateNewContact";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { isContactLogged } from "../../middlewares/isContactLoggad";
import GoogleIcon from "../components/icons/GoogleIcon";
import LogoImage from "../components/icons/LogoImage";

// CSS
import "./styles/LoginPage.scss";

export function LoginPage({
  createNewContactUsecase,
  userAuthenticator,
  findUserByUsernameUsename,
}: ILoginPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isContactLogged()) navigate("/chat/__chatid__/chatList/");
  }, []);

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
                  createNewContactGoogleAuthenticatorMethod(
                    e,
                    createNewContactUsecase,
                    userAuthenticator,
                    findUserByUsernameUsename,
                    navigate,
                  )
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

async function createNewContactGoogleAuthenticatorMethod(
  e: React.MouseEvent,
  createNewContactUsecase: ICreateNewContact,
  userAuthenticator: IUserAuthenticator,
  findUserByUsernameUsename: IFindContactByUsername,
  navigate: NavigateFunction,
) {
  try {
    e.preventDefault();

    const contactMolde = await userAuthenticator.getUserInfo();

    const getContact = async () => {
      const contactCreatedBefore = await findUserByUsernameUsename.Handler(
        contactMolde.username as string,
      );

      if (contactCreatedBefore) return contactCreatedBefore;

      return await createNewContactUsecase.Handler(contactMolde);
    };

    const contact = await getContact();
    setLocalstorageContactUsername(contact.username);

    navigate("/chat/__chatid__/chatList");
  } catch (e) {
    alert(e);
    console.error(e);
  }
}

function setLocalstorageContactUsername(contactUsername: string) {
  localStorage.setItem("contact_username", contactUsername);
}
