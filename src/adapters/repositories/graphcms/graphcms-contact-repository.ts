import { IContactRepository } from "../../../interfaces/repositories/IContactRepository";
import { IContactQuery } from "../../../interfaces/queries/IContactQuery";
import { apolloClient } from "../../../libs/ApolloLib";
import { GetContactByUsernameQueryDocument } from "../../../graphql/generatedCodegen";

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
  // findContactByNumber(){}
}
