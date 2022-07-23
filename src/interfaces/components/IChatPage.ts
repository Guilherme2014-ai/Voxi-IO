import { ICreateNewMessage } from "../usecases/CreateNewMessage";
import IFindChatByID from "../usecases/IFindChatByID";
import { IFindContactByUsername } from "../usecases/IFindContactByUsername";

export interface IChatPage {
  findContactByUsernameUsecase: IFindContactByUsername;
  findChatByIDUsecase: IFindChatByID;
  createMessageUsecase: ICreateNewMessage;
}
