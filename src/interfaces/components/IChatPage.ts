import { IFindContactByUsername } from "../usecases/IFindContactByUsername";

export interface IChatPage {
  findContactByUsernameUsecase: IFindContactByUsername;
}
