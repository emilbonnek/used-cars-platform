import { Output, email, object, parse, string } from "valibot";

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
  const response = await fetch("/data/user.json", { signal });
  const json = await response.json();
  const user = parse(UserSchema, json);
  return user;
}
