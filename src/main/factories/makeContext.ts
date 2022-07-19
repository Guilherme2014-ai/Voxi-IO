/* eslint-disable @typescript-eslint/no-unused-vars */
import { context } from "../../adapters/context/UsecasesContext";
import { GraphcmsChatRepository } from "../../adapters/repositories/graphcms/graphcms-chat-repository";
import { GraphcmsUserRepository } from "../../adapters/repositories/graphcms/graphcms-user-repository";
import { IUsecasesContext } from "../../interfaces/context/IUsecasesContext";
import { FindAllChats } from "../../useCases/find-all-chats/Find-all-chats";

export const makeUsecasesContext = () => {
  // Repositories
  // const userRepository = new GraphcmsUserRepository();
  const chatRepository = new GraphcmsChatRepository();

  // Use Cases
  const findAllChatsUsecase = new FindAllChats(chatRepository);

  const value: IUsecasesContext = {
    findAllChatsUsecase,
  };

  return {
    context,
    value,
  };
};
