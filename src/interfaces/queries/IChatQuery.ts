import { IContactQuery } from "./IContactQuery";
import { IMessageQuery } from "./IMessageQuery";

export interface IChatQuery {
  contacts: IContactQuery[];
  messages: IMessageQuery[];
}
