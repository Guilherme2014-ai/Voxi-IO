import { IMessageQuery } from "../queries/IMessageQuery";

export interface IMessageRepository {
  Create(
    messageText: string,
    contactId: string,
    chatId: string,
  ): Promise<IMessageQuery>;
}
