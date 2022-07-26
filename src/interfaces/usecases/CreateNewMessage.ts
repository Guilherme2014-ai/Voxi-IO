import { IMessageQuery } from "../queries/IMessageQuery";

export interface ICreateNewMessage {
  Handle(
    messageText: string,
    contactId: string,
    chatId: string,
  ): Promise<IMessageQuery>;
}
