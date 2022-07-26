import { IChatQuery } from "../queries/IChatQuery";

export interface IChatRepository {
  Create(
    contactSenderId: string,
    contactReceiverNumber: number | null,
    contactReceiverUsername: string | null,
  ): Promise<IChatQuery>;
  findAllChats(): Promise<IChatQuery[]>;
  findChatById(id: string): Promise<IChatQuery>;
}
