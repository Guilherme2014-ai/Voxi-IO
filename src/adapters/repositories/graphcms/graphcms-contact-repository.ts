import { IContactRepository } from "../../../interfaces/repositories/IContactRepository";
import { IContactQuery } from "../../../interfaces/queries/IContactQuery";
import { apolloClient } from "../../../libs/ApolloLib";
import {
  CreateNewContactDocument,
  GetContactByNumberQueryDocument,
  GetContactByUsernameQueryDocument,
} from "../../../graphql/generatedCodegen";
import { IContactMolde } from "../../../interfaces/IContactMolde";
import { gql } from "@apollo/client";

export class GraphcmsContactRepository implements IContactRepository {
  async findContactByUsername(username: string): Promise<IContactQuery> {
    try {
      const test = await apolloClient.query<{ contact: IContactQuery }>({
        query: GetContactByUsernameQueryDocument,
        variables: {
          username,
        },
      });
      const contact = test.data.contact;

      console.log(username, test);

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

    await apolloClient.mutate({
      mutation: gql`
        mutation PublicAllContacts {
          publishManyContacts(to: PUBLISHED) {
            count
          }
        }
      `,
    });

    return createdContact;
  }
}
