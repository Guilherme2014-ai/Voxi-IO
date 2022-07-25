import { IContactMolde } from "../../interfaces/IContactMolde";
import { IContactRepository } from "../../interfaces/repositories/IContactRepository";
import isUsernameAlreadyUsed from "./isUsernameAlreadyUsed";
import nameVerifier from "./nameVerifier";
import { isNumberAlreadyUsed } from "./numberVerifier";
import usernameVerifier from "./usernameVerifier";

export class ContactEntity {
  static async Create(
    contactModel: IContactMolde,
    contactRepository: IContactRepository,
  ) {
    try {
      const { name, username, number } = contactModel;

      nameVerifier(name as string);
      usernameVerifier(username as string);
      await isUsernameAlreadyUsed(username as string, contactRepository);
      if (number)
        await isNumberAlreadyUsed(number as number, contactRepository);
    } catch (e) {
      throw e;
    }
  }

  static findByUsernameVerifier(username: string) {
    return usernameVerifier(username);
  }
}
