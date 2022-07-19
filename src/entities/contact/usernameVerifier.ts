// Não pode ser menor que 3 e maior que 30
// É único
// Deve ter formaro de Slug

import { ErrorResponse } from "../../factories/ErrorResponse";
import { IUserRepository } from "../../interfaces/adapters/IUserRepository";

export default async (username: string, userRepository: IUserRepository) => {
  try {
    const slugfiedUsername = username.replace(" ", "_").toLowerCase();
    const errors = [];

    if (slugfiedUsername == "")
      errors.push(new ErrorResponse("Username cant be null", 400));
    if (slugfiedUsername.length < 3 || slugfiedUsername.length > 30)
      errors.push(new ErrorResponse("Username limits are required", 400));

    const isUsernameAlreadyUsed =
      userRepository.findContactByUsername(slugfiedUsername);
    if (isUsernameAlreadyUsed)
      errors.push(new ErrorResponse("Username already used", 401));

    if (errors.length > 0) throw errors;
  } catch (e) {
    throw e;
  }
};
