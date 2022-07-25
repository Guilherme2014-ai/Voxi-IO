import { IContactQuery } from "../queries/IContactQuery";

export interface ICreateNewContact {
  Handler(): Promise<IContactQuery>;
}
