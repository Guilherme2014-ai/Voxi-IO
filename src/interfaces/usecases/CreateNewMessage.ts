import { IMessageQuery } from "../queries/IMessageQuery";
import { IMessageRepository } from "../repositories/IMessageRepository";

export interface ICreateNewMessage {
  Handle(
    messageText: string,
    contactSenderUsername: string,
    chatId: string,
  ): Promise<IMessageQuery>;
}
