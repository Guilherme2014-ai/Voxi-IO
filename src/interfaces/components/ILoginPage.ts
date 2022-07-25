import { IUserAuthenticator } from "../authenticators/IUserAuthenticator";
import { ICreateNewContact } from "../usecases/CreateNewContact";
import { IFindContactByUsername } from "../usecases/IFindContactByUsername";

export interface ILoginPageProps {
  createNewContactUsecase: ICreateNewContact;
  findUserByUsernameUsename: IFindContactByUsername;
  userAuthenticator: IUserAuthenticator;
}
