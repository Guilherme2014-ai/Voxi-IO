import { IContactQuery } from "../interfaces/queries/IContactQuery";

export const contactSenderDataByUsername = (
  username: string,
  contacts: IContactQuery[],
) => contacts.find((contact) => contact.username == username);
