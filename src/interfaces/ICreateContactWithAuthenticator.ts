import { IContactQuery } from "./queries/IContactQuery";

export interface ICreateContactWithAuthenticator {
  Handler(): Promise<IContactQuery>;
}
