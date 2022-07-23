import { ErrorResponse } from "../../factories/ErrorResponse";
import { isTextEmpty } from "./messageVerifier";

export class MessageEntity {
  static Create(messageText: string, contactUsernameSender: string) {
    try {
      const errors = [];

      const isMessageTextEmpty = isTextEmpty(messageText);
      const isUserNameEmpty = isTextEmpty(contactUsernameSender);

      if (isMessageTextEmpty || isUserNameEmpty)
        errors.push(new ErrorResponse("Some field is not filled !", 400));

      if (errors.length > 0) throw errors;
    } catch (e) {
      throw e;
    }
  }
}
