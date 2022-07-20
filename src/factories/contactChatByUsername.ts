import { IContactQuery } from "../interfaces/queries/IContactQuery";

export const contactChatByUsername = (
  contacts: IContactQuery[],
  userLoggedUsername: string,
) => {
  return contacts.filter(
    (contact) => contact.username != userLoggedUsername,
  )[0];
};
