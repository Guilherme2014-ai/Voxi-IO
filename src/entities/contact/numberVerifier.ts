import { ErrorResponse } from "../../factories/ErrorResponse";
import { IContactRepository } from "../../interfaces/repositories/IContactRepository";

export async function isNumberAlreadyUsed(
  number: number,
  contactRepository: IContactRepository,
) {
  const errors = [];

  const isNumberAlreadyUsed = await contactRepository.findContactByNumber(
    number,
  );

  if (isNumberAlreadyUsed)
    errors.push(
      new ErrorResponse("An Contact with this number is already created", 400),
    );

  if (errors.length > 0) throw errors;
}
