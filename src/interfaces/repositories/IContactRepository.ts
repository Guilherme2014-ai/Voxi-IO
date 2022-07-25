// Sujeito a mudança

import { IContactMolde } from "../IContactMolde";
import { IContactQuery } from "../queries/IContactQuery";

export interface IContactRepository {
  /*Create(
    name: string,
    username: string,
  ): {
    name: string;
    username: string;
  };*/

  findContactByUsername(username: string): Promise<IContactQuery>;
  findContactByNumber(number: number | string): Promise<IContactQuery>;
  createContact(contactMolde: IContactMolde): Promise<IContactQuery>;
}
