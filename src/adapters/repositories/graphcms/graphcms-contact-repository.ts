import { IContactRepository } from "../../../interfaces/repositories/IContactRepository";
import { IContactQuery } from "../../../interfaces/queries/IContactQuery";
import { apolloClient } from "../../../libs/ApolloLib";
import {
  CreateNewContactDocument,
  GetContactByNumberQueryDocument,
  GetContactByUsernameQueryDocument,
} from "../../../graphql/generatedCodegen";
import { IContactMolde } from "../../../interfaces/IContactMolde";

export class GraphcmsContactRepository implements IContactRepository {
  /*async Create(
    name: string,
    username: string,
  ): { name: string; username: string } {
    console.log("User created (mock)");
    return { name, username };
  }*/
  async findContactByUsername(username: string): Promise<IContactQuery> {
    try {
      const contact = (
        await apolloClient.query<{ contact: IContactQuery }>({
          query: GetContactByUsernameQueryDocument,
          variables: {
            username,
          },
        })
      ).data.contact;

      return contact;
    } catch (e) {
      throw e;
    }
  }

  async findContactByNumber(number: string | number): Promise<IContactQuery> {
    try {
      const contact = (
        await apolloClient.query<{ contact: IContactQuery }>({
          query: GetContactByNumberQueryDocument,
          variables: {
            number,
          },
        })
      ).data.contact;

      return contact;
    } catch (e) {
      throw e;
    }
  }

  async createContact(contactMolde: IContactMolde): Promise<IContactQuery> {
    const createdContact = (
      await apolloClient.mutate<{
        createContact: IContactQuery;
      }>({
        mutation: CreateNewContactDocument,
        variables: contactMolde,
      })
    ).data?.createContact as IContactQuery;

    return createdContact;
  }
}
