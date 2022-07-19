import { IChatQuery } from "../queries/IChatQuery";

export interface IFindAllChats {
  Handle(): Promise<() => IChatQuery[] | Promise<IChatQuery[]>>;
}
