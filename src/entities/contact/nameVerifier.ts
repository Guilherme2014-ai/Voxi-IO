// Não pode ser menor que 3 e maior que 40

import { ErrorResponse } from "../../factories/ErrorResponse";

export default (name: string) => {
  try {
    const nameWithNoSpace = name.trim();
    const isNameWithNoSpaceNull = nameWithNoSpace == "";

    const errors: ErrorResponse[] = [];

    if (isNameWithNoSpaceNull)
      errors.push(new ErrorResponse("Name can't be null", 400));
    if (nameWithNoSpace.length < 3 || nameWithNoSpace.length > 40)
      errors.push(new ErrorResponse("Name limits are required", 400));

    if (errors.length > 0) throw errors;
  } catch (e) {
    throw e;
  }
};
