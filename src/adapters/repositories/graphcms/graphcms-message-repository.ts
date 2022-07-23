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

    console.log(mutationConfig);
    const messageCreated = (
      await apolloClient.mutate<{
        message: IMessageQuery;
      }>({
        mutation: CreateNewMessageDocument,
        variables: mutationConfig,
      })
    ).data?.message as IMessageQuery;

    console.log("messageCreated");

    return messageCreated;
  }
}
