import { IChatQuery } from "./IChatQuery";

export interface IContactQuery {
  name: string;
  username: string;
  chats: IChatQuery[];
}
