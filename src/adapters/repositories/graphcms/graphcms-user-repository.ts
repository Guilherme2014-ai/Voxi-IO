import { IUserRepository } from "../../../interfaces/adapters/IUserRepository";

export class GraphcmsUserRepository implements IUserRepository {
  Create(name: string, username: string): { name: string; username: string } {
    console.log("User created (mock)");
    return { name, username };
  }
  findContactByUsername(username: string) {
    console.log(`User with username(${username})`);
    return {
      name: "Some user",
      username: "some_user",
    };
  }
  // findContactByNumber(){}
}
