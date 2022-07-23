import { gql } from "@apollo/client";
import { CreateNewMessageDocument } from "../../../graphql/generatedCodegen";
import { IMessageQuery } from "../../../interfaces/queries/IMessageQuery";
import { IMessageRepository } from "../../../interfaces/repositories/IMessageRepository";
import { apolloClient } from "../../../libs/ApolloLib";

export class GraphcmsMessageRepository implements IMessageRepository {
  async Create(
    messageText: string,
    username: string,
    chatId: string,
  ): Promise<IMessageQuery> {
    const mutationConfig = {
      messageText,
      contactSenderUsername: username,
      chat_id: chatId,
    };

    const createdMessage = (
      await apolloClient.mutate<{
        createMessage: IMessageQuery;
      }>({
        mutation: CreateNewMessageDocument,
        variables: mutationConfig,
      })
    ).data?.createMessage as IMessageQuery;

    await apolloClient.mutate({
      mutation: gql`
        mutation PublicAllMessages {
          publishManyMessages(to: PUBLISHED) {
            count
          }
        }
      `,
    });

    return createdMessage;
  }
}
