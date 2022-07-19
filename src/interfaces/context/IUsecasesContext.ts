// import { IChatRepository } from "../adapters/IChatRepository";
import { IContactRepository } from "../repositories/IContactRepository";
import { IFindAllChats } from "../usecases/IFindAllChats";
import { IFindContactByUsername } from "../usecases/IFindContactByUsername";
// import { IUserRepository } from "../adapters/IUserRepository";

export interface IUsecasesContext {
  findAllChatsUsecase: IFindAllChats;
  findContactByUsernameUsecase: IFindContactByUsername;
}
