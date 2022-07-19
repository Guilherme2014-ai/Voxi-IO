import { IContactRepository } from "../../interfaces/repositories/IContactRepository";
import isUsernameAlreadyUsed from "./isUsernameAlreadyUsed";
import nameVerifier from "./nameVerifier";
import usernameVerifier from "./usernameVerifier";

export class ContactEntity {
  static async Create(
    name: string,
    username: string,
    contactRepository: IContactRepository,
  ) {
    try {
      nameVerifier(name);
      usernameVerifier(username);
      await isUsernameAlreadyUsed(username, contactRepository);
    } catch (e) {
      throw e;
    }
  }

  static findByUsernameVerifier(username: string) {
    return usernameVerifier(username);
  }
}
