import { ErrorResponse } from "../../factories/ErrorResponse";
import { contactFinderFieldVerifier } from "./contactFinderFieldVerifier";
import IDVerifier from "./IDVerifier";
import { isFieldEmpty } from "./isFieldEmpty";

export class ChatEntity {
  static create(
    contactSenderId: string,
    contactReceiverNumber: number | null,
    contactReceiverUsername: string | null,
  ) {
    try {
      contactFinderFieldVerifier(
        contactReceiverNumber,
        contactReceiverUsername,
      );

      const iscontactSenderIdEmpty = isFieldEmpty(contactSenderId);

      if (iscontactSenderIdEmpty)
        throw [new ErrorResponse("Something went wrong", 401)];
    } catch (e) {
      throw e;
    }
  }

  static getChatByID(id: string) {
    try {
      IDVerifier(id);
    } catch (e) {
      throw e;
    }
  }
}
