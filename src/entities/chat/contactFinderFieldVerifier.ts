import { ErrorResponse } from "../../factories/ErrorResponse";
import { isFieldEmpty } from "./isFieldEmpty";

export function contactFinderFieldVerifier(
  contactReceiverNumber: number | null,
  contactReceiverUsername: string | null,
) {
  const errors = [];

  const iscontactReceiverNumberEmpty = isFieldEmpty(contactReceiverNumber);
  const iscontactReceiverUsernameEmpty = isFieldEmpty(contactReceiverUsername);

  if (iscontactReceiverNumberEmpty && iscontactReceiverUsernameEmpty)
    errors.push(new ErrorResponse("This field can't be null", 400));

  if (errors.length > 0) throw errors;
}
