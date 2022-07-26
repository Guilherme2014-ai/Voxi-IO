/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateNewChatDocument,
  GetAllChatsQueryDocument,
  GetChatByIdQueryDocument,
} from "../../../graphql/generatedCodegen";
import { IChatRepository } from "../../../interfaces/repositories/IChatRepository";
import { IChatQuery } from "../../../interfaces/queries/IChatQuery";
import { apolloClient } from "../../../libs/ApolloLib";
import { gql } from "@apollo/client";

export class GraphcmsChatRepository implements IChatRepository {
  async Create(
    contactSenderId: string,
    contactReceiverNumber: number | null,
    contactReceiverUsername: string | null,
  ): Promise<IChatQuery> {
    console.log(contactReceiverNumber, contactReceiverUsername);
    const chatCreated = (
      await apolloClient.mutate<{ createChat: IChatQuery }>({
        mutation: CreateNewChatDocument,
        variables: {
          contactSenderId,
          contactReceiverUsername,
          contactReceiverNumber,
        },
      })
    ).data?.createChat as IChatQuery;

    await apolloClient.mutate({
      mutation: gql`
        mutation MyMutation {
          publishManyChats(to: PUBLISHED) {
            count
          }
        }
      `,
    });

    return chatCreated;
  }

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
