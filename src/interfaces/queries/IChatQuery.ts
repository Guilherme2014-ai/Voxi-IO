import { IContactQuery } from "./IContactQuery";
import { IMessageQuery } from "./IMessageQuery";

export interface IChatQuery {
  id: string;
  contacts: IContactQuery[];
  messages: IMessageQuery[];
}
