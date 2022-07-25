import { ErrorResponse } from "../../factories/ErrorResponse";
import { IContactRepository } from "../../interfaces/repositories/IContactRepository";

export default async (
  slugfiedUsername: string,
  contactRepository: IContactRepository,
) => {
  try {
    const errors = [];

    const isUsernameAlreadyUsed = await contactRepository.findContactByUsername(
      slugfiedUsername,
    );

    if (isUsernameAlreadyUsed)
      errors.push(new ErrorResponse("Username already used", 401));
  } catch (e) {
    throw e;
  }
};
