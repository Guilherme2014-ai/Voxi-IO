/* eslint-disable @typescript-eslint/no-unused-vars */
import { context } from "../../adapters/context/UsecasesContext";
import { GraphcmsChatRepository } from "../../adapters/repositories/graphcms/graphcms-chat-repository";
import { GraphcmsContactRepository } from "../../adapters/repositories/graphcms/graphcms-contact-repository";
import { IUsecasesContext } from "../../interfaces/context/IUsecasesContext";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { FindAllChats } from "../../useCases/find-all-chats/Find-all-chats";
import findChatByID from "../../useCases/find-chat-by-id/find-chat-by-id";
import { FindContactByUsername } from "../../useCases/find-contact-by-username/find-contact-by-username";

export const makeUsecasesContext = () => {
  // Repositories
  const contactRepository = new GraphcmsContactRepository();
  const chatRepository = new GraphcmsChatRepository();

  // Use Cases
  const findContactByUsernameUsecase = new FindContactByUsername(
    contactRepository,
  );
  const findAllChatsUsecase = new FindAllChats(chatRepository);
  const findChatByIDUsecase = new findChatByID(chatRepository);

  const value: IUsecasesContext = {
    findAllChatsUsecase,
    findContactByUsernameUsecase,
    findChatByIDUsecase,
  };

  return {
    context,
    value,
  };
};
