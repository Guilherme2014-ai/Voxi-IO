import { IContactMolde } from "../IContactMolde";
import { IContactQuery } from "../queries/IContactQuery";

export interface ICreateNewContact {
  Handler(contactMolde: IContactMolde): Promise<IContactQuery>;
}
