import { ErrorResponse } from "../../factories/ErrorResponse";

export default (id: string) => {
  try {
    const errors = [];
    const isEmptyId = id.trim() == "";

    if (isEmptyId) errors.push(new ErrorResponse("Chat ID can't be null", 400));

    if (errors.length > 0) throw errors;
  } catch (e) {
    throw e;
  }
};
