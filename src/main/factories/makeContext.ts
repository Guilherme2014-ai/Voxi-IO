/* eslint-disable @typescript-eslint/no-unused-vars */
import { context } from "../../adapters/context/UsecasesContext";
import { GraphcmsChatRepository } from "../../adapters/repositories/graphcms/graphcms-chat-repository";
import { GraphcmsContactRepository } from "../../adapters/repositories/graphcms/graphcms-contact-repository";
import { GraphcmsMessageRepository } from "../../adapters/repositories/graphcms/graphcms-message-repository";
import { IUsecasesContext } from "../../interfaces/context/IUsecasesContext";
import { IFindContactByUsername } from "../../interfaces/usecases/IFindContactByUsername";
import { CreateNewMessage } from "../../useCases/create-new-message/create-new-message";
import { FindAllChats } from "../../useCases/find-all-chats/Find-all-chats";
import findChatByID from "../../useCases/find-chat-by-id/find-chat-by-id";
import { FindContactByUsername } from "../../useCases/find-contact-by-username/find-contact-by-username";
import { CreateContactWithAuthenticator } from "../../useCases/create-contact-with-authenticatior/create-contact-with-authenticatior";
import { GoogleAuthenticator } from "../../adapters/authenticators/GoogleAuthenticator";

export const makeUsecasesContext = () => {
  // Repositories
  const contactRepository = new GraphcmsContactRepository();
  const chatRepository = new GraphcmsChatRepository();
  const messageRepository = new GraphcmsMessageRepository();

  // Authencticators
  const userAuthenticator = new GoogleAuthenticator();

  // Use Cases
  const findContactByUsernameUsecase = new FindContactByUsername(
    contactRepository,
  );
  const findAllChatsUsecase = new FindAllChats(chatRepository);
  const findChatByIDUsecase = new findChatByID(chatRepository);
  const createMessageUsecase = new CreateNewMessage(messageRepository);
  const createNewContactUsecase = new CreateContactWithAuthenticator(
    contactRepository,
  );

  // não apenas usecases --> Arruamar
  const value: IUsecasesContext = {
    findAllChatsUsecase,
    findContactByUsernameUsecase,
    findChatByIDUsecase,
    createMessageUsecase,
    createNewContactUsecase,
    userAuthenticator,
  };

  return {
    context,
    value,
  };
};
