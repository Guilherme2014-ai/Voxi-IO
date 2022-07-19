import { IContactQuery } from "../queries/IContactQuery";

export interface IFindContactByUsername {
  Handler(username: string): Promise<IContactQuery>;
}
