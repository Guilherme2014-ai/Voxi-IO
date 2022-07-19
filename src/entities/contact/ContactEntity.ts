import { IUserRepository } from "../../interfaces/adapters/IUserRepository";
import nameVerifier from "./nameVerifier";
import usernameVerifier from "./usernameVerifier";

export class ContactEntity {
  Create(name: string, username: string, userRepository: IUserRepository) {
    nameVerifier(name);
    usernameVerifier(username, userRepository);
  }
}
