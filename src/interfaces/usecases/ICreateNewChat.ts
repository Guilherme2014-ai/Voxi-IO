import { IChatQuery } from "../queries/IChatQuery";

export interface ICreateNewChat {
  Handler(
    contactSenderId: string,
    contactReceiverUsername: string | null,
    contactReceiverNumber: number | null,
  ): Promise<IChatQuery>;
}
