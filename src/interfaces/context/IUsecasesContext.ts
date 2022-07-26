// import { IChatRepository } from "../adapters/IChatRepository";
import { IUserAuthenticator } from "../authenticators/IUserAuthenticator";
import { IContactRepository } from "../repositories/IContactRepository";
import { ICreateNewChat } from "../usecases/ICreateNewChat";
import { ICreateNewContact } from "../usecases/ICreateNewContact";
import { ICreateNewMessage } from "../usecases/ICreateNewMessage";
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
  createNewChat: ICreateNewChat;
}
