import { MessageEntity } from "../../entities/message/messageEntity";
import { IMessageQuery } from "../../interfaces/queries/IMessageQuery";
import { IMessageRepository } from "../../interfaces/repositories/IMessageRepository";
import { ICreateNewMessage } from "../../interfaces/usecases/CreateNewMessage";

export class CreateNewMessage implements ICreateNewMessage {
  constructor(private messageRepository: IMessageRepository) {}

  async Handle(
    messageText: string,
    contactId: string,
    chatId: string,
  ): Promise<IMessageQuery> {
    try {
      // tbm da certo, mas dps criar um novo
      MessageEntity.Create(messageText, contactId);

      return await this.messageRepository.Create(
        messageText,
        contactId,
        chatId,
      );
    } catch (e) {
      throw e;
    }
  }
}
