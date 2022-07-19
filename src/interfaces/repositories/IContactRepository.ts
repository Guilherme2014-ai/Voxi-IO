// Sujeito a mudança

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
}
