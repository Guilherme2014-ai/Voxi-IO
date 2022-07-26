import { ChatEntity } from "../../entities/chat/ChatEntity";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IChatRepository } from "../../interfaces/repositories/IChatRepository";
import { ICreateNewChat } from "../../interfaces/usecases/ICreateNewChat";

export class CreateNewChat implements ICreateNewChat {
  constructor(private chatRepository: IChatRepository) {}

  async Handler(
    contactSenderId: string,
    contactReceiverUsername: string | null,
    contactReceiverNumber: number | null,
  ): Promise<IChatQuery> {
    try {
      ChatEntity.create(
        contactSenderId,
        contactReceiverNumber,
        contactReceiverUsername,
      );

      const chatCreated = await this.chatRepository.Create(
        contactSenderId,
        contactReceiverNumber,
        contactReceiverUsername,
      );

      return chatCreated;
    } catch (e) {
      throw e;
    }
  }
}
