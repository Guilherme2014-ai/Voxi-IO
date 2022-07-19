// Não pode ser menor que 3 e maior que 30
// É único
// Deve ter formaro de Slug

import { ErrorResponse } from "../../factories/ErrorResponse";

export default (username: string) => {
  try {
    const errors = [];

    if (username == "")
      errors.push(new ErrorResponse("Username cant be null", 400));
    if (username.length < 3 || username.length > 30)
      errors.push(new ErrorResponse("Username limits are required", 400));

    if (errors.length > 0) throw errors;

    return username;
  } catch (e) {
    throw e;
  }
};
