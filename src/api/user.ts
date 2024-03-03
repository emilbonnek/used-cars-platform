import { rangeDelay } from "delay";
import { Output, email, object, parse, string } from "valibot";
import { DELAY_MAX_MS, DELAY_MIN_MS } from "../delay";

export const UserSchema = object({
  email: string([email()]),
  firstName: string(),
  lastName: string(),
});
export type User = Output<typeof UserSchema>;

/**
 * Get the current user from the data/user.json file
 */
export async function getUser(signal: AbortSignal): Promise<User> {
  await rangeDelay(DELAY_MIN_MS, DELAY_MAX_MS, { signal });
  const response = await fetch("/data/user.json", { signal });
  const json = await response.json();
  const user = parse(UserSchema, json);
  return user;
}
