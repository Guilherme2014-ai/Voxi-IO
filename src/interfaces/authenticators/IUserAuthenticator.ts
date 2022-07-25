import { IContactMolde } from "../IContactMolde";

export interface IUserAuthenticator {
  getUserInfo(): Promise<IContactMolde>;
}
