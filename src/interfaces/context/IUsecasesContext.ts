// import { IChatRepository } from "../adapters/IChatRepository";
import { IFindAllChats } from "../usecases/IFindAllChats";
// import { IUserRepository } from "../adapters/IUserRepository";

export interface IUsecasesContext {
  findAllChatsUsecase: IFindAllChats;
}
