import { IMessageQuery } from "../queries/IMessageQuery";

export interface IMessageRepository {
  Create(
    messageText: string,
    username: string,
    chatId: string,
  ): Promise<IMessageQuery>;
}
