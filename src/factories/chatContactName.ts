import { IContactQuery } from "../interfaces/queries/IContactQuery";

export default (contacts: IContactQuery[], userLoggedName: string) => {
  return contacts.filter((contact) => contact.name != userLoggedName)[0].name;
};
