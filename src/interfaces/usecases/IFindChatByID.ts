import { IChatQuery } from "../queries/IChatQuery";

export default interface IFindChatByID {
  Handler(chat_id: string): Promise<IChatQuery>;
}
