import { IContactMolde } from "./IContactMolde";
import { IContactQuery } from "./queries/IContactQuery";

export interface ICreateContactWithAuthenticator {
  Handler(contactMolde: IContactMolde): Promise<IContactQuery>;
}
