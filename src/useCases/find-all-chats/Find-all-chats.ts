import { IChatRepository } from "../../interfaces/adapters/IChatRepository";

export class FindAllChats {
  constructor(private chatRepository: IChatRepository) {}

  async Handle() {
    return await this.chatRepository.findAllChats;
  }
}
