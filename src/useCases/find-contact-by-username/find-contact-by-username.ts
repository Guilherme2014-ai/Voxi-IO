import { ContactEntity } from "../../entities/contact/ContactEntity";
import slugfier from "../../factories/slugfier";
import { IContactRepository } from "../../interfaces/repositories/IContactRepository";

// Este é o trabalho certo

export class FindContactByUsername {
  constructor(private contactRepository: IContactRepository) {}

  Handler(username: string) {
    try {
      const usernameSlofied = slugfier(username);
      ContactEntity.findByUsernameVerifier(usernameSlofied);

      return this.contactRepository.findContactByUsername(usernameSlofied);
    } catch (e) {
      throw e;
    }
  }
}
