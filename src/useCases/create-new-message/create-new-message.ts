import { MessageEntity } from "../../entities/message/messageEntity";
import { IMessageQuery } from "../../interfaces/queries/IMessageQuery";
import { IMessageRepository } from "../../interfaces/repositories/IMessageRepository";
import { ICreateNewMessage } from "../../interfaces/usecases/CreateNewMessage";

export class CreateNewMessage implements ICreateNewMessage {
  constructor(private messageRepository: IMessageRepository) {}

  async Handle(
    messageText: string,
    contactSenderUsername: string,
    chatId: string,
  ): Promise<IMessageQuery> {
    try {
      MessageEntity.Create(messageText, contactSenderUsername);

      return await this.messageRepository.Create(
        messageText,
        contactSenderUsername,
        chatId,
      );
    } catch (e) {
      throw e;
    }
  }
}
