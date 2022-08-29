import { Dispatch, useEffect } from "react";
import { NavigateFunction } from "react-router";

// Interfaces
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";

export function useLoadLoggedContactData(
  setLoggedContactDataState: Dispatch<
    React.SetStateAction<IContactQuery | null>
  >,
  navigate: NavigateFunction,
  findContactByUsernameUsecase: IFindContactByUsername,
) {
  useEffect(() => {
    async function loadLoggedContact() {
      try {
        const userLoggedUsername = localStorage.getItem("contact_username"); // Esta informação será tirada do localStorage

        if (userLoggedUsername) {
          const loggedContact = await findContactByUsernameUsecase.Handler(
            userLoggedUsername,
          );

          setLoggedContactDataState(loggedContact);
        } else {
          navigate("/");
        }
      } catch (e) {
        alert(e);
        console.error(e);
      }
    }

    loadLoggedContact();
  }, []);
}
