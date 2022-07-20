import { IChatQuery } from "./IChatQuery";

export interface IContactQuery {
  name: string;
  username: string;
  profile_picture_url: string;
  chats: IChatQuery[];
}
