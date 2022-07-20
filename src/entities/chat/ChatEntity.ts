import IDVerifier from "./IDVerifier";

export class ChatEntity {
  static getChatByID(id: string) {
    try {
      IDVerifier(id);
    } catch (e) {
      throw e;
    }
  }
}
