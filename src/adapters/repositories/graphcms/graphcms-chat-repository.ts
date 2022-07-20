/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GetAllChatsQueryDocument,
  GetChatByIdQueryDocument,
} from "../../../graphql/generatedCodegen";
import { IChatRepository } from "../../../interfaces/repositories/IChatRepository";
import { IChatQuery } from "../../../interfaces/queries/IChatQuery";
import { apolloClient } from "../../../libs/ApolloLib";

export class GraphcmsChatRepository implements IChatRepository {
  async findAllChats(): Promise<IChatQuery[]> {
    try {
      const chats = await apolloClient.query<IChatQuery[]>({
        query: GetAllChatsQueryDocument,
      });
      return chats as any as IChatQuery[];
    } catch (e) {
      throw e;
    }
  }

  async findChatById(id: string): Promise<IChatQuery> {
    try {
      const chat = (
        await apolloClient.query({
          query: GetChatByIdQueryDocument,
          variables: { chat_id: id },
        })
      ).data as { chat: IChatQuery };

      return chat.chat;
    } catch (e) {
      throw e;
    }
  }
}
