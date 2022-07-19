/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetAllChatsQueryDocument } from "../../../graphql/generatedCodegen";
import { IChatRepository } from "../../../interfaces/repositories/IChatRepository";
import { IChatQuery } from "../../../interfaces/queries/IChatQuery";
import { apolloClient } from "../../../libs/ApolloLib";

export class GraphcmsChatRepository implements IChatRepository {
  async findAllChats(): Promise<IChatQuery[]> {
    const chats = await apolloClient.query<IChatQuery[]>({
      query: GetAllChatsQueryDocument,
    });
    return chats as any as IChatQuery[];
  }
}
