import { IChatQuery } from "./IChatQuery";

export interface IContactQuery {
  id: string;
  name: string;
  username: string;
  profile_picture_url: string;
  bio: string;
  chats: IChatQuery[];
}
