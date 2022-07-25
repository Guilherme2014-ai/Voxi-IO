// import { IChatRepository } from "../adapters/IChatRepository";
import { IUserAuthenticator } from "../authenticators/IUserAuthenticator";
import { IContactRepository } from "../repositories/IContactRepository";
import { ICreateNewContact } from "../usecases/CreateNewContact";
import { ICreateNewMessage } from "../usecases/CreateNewMessage";
import { IFindAllChats } from "../usecases/IFindAllChats";
import IFindChatByID from "../usecases/IFindChatByID";
import { IFindContactByUsername } from "../usecases/IFindContactByUsername";
// import { IUserRepository } from "../adapters/IUserRepository";

export interface IUsecasesContext {
  findAllChatsUsecase: IFindAllChats;
  findContactByUsernameUsecase: IFindContactByUsername;
  findChatByIDUsecase: IFindChatByID;
  createMessageUsecase: ICreateNewMessage;
  createNewContactUsecase: ICreateNewContact;
  userAuthenticator: IUserAuthenticator;
}
