import { ICreateNewChat } from "../usecases/ICreateNewChat";
import { ICreateNewMessage } from "../usecases/ICreateNewMessage";
import IFindChatByID from "../usecases/IFindChatByID";
import { IFindContactByUsername } from "../usecases/IFindContactByUsername";

export interface IChatPage {
  findContactByUsernameUsecase: IFindContactByUsername;
  findChatByIDUsecase: IFindChatByID;
  createMessageUsecase: ICreateNewMessage;
  createNewChat: ICreateNewChat;
}
