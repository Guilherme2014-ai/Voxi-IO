import { ContactEntity } from "../../entities/contact/ContactEntity";
import slugfier from "../../factories/slugfier";
import { IContactMolde } from "../../interfaces/IContactMolde";
import { ICreateContactWithAuthenticator } from "../../interfaces/ICreateContactWithAuthenticator";
import { IContactQuery } from "../../interfaces/queries/IContactQuery";
import { IContactRepository } from "../../interfaces/repositories/IContactRepository";

export class CreateContactWithAuthenticator
  implements ICreateContactWithAuthenticator
{
  constructor(private contactReporitory: IContactRepository) {}

  async Handler(contactMolde: IContactMolde): Promise<IContactQuery> {
    try {
      contactMolde.username = slugfier(contactMolde.username as string);

      ContactEntity.Create(contactMolde, this.contactReporitory);

      return this.contactReporitory.createContact(contactMolde);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
