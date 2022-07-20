import { ChatEntity } from "../../entities/chat/ChatEntity";
import { IChatQuery } from "../../interfaces/queries/IChatQuery";
import { IChatRepository } from "../../interfaces/repositories/IChatRepository";
import IFindChatByID from "../../interfaces/usecases/IFindChatByID";

export default class findChatByID implements IFindChatByID {
  constructor(private chatRepository: IChatRepository) {}
  async Handler(chat_id: string): Promise<IChatQuery> {
    try {
      ChatEntity.getChatByID(chat_id);
      const chat = await this.chatRepository.findChatById(chat_id);

      return chat;
    } catch (e) {
      throw e;
    }
  }
}
