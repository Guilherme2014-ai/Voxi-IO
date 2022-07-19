import { IChatRepository } from "../../interfaces/repositories/IChatRepository";
import { IFindAllChats } from "../../interfaces/usecases/IFindAllChats";

export class FindAllChats implements IFindAllChats {
  constructor(private chatRepository: IChatRepository) {}

  async Handle() {
    return await this.chatRepository.findAllChats;
  }
}
