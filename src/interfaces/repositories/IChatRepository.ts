import { IChatQuery } from "../queries/IChatQuery";

export interface IChatRepository {
  // Create():
  findAllChats(): Promise<IChatQuery[]>;
  findChatById(id: string): Promise<IChatQuery>;
}
