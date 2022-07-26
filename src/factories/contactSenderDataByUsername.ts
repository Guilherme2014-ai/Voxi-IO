import { IContactQuery } from "../interfaces/queries/IContactQuery";

export const contactSenderDataByUsername = (
  id: string,
  contacts: IContactQuery[],
) => contacts.find((contact) => contact.id == id);
