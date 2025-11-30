import * as z from 'zod';
import { zodClientDataParser, zodServerDataParser } from '../+shared/helpers/zod.js';

export const zUserId = z.uuid().brand<'UserId'>();
export type UserId = z.infer<typeof zUserId>;
export const userId = {
  parseClient: zodClientDataParser(zUserId),
  parseServer: zodServerDataParser(zUserId),
};

const clerkIdPattern = /^user_[0-9A-Za-z]{27}$/;
export const zClerkId = z.string().regex(clerkIdPattern).brand<'ClerkId'>();
export type ClerkId = z.infer<typeof zClerkId>;
export const ClerkId = {
  parseClient: zodClientDataParser(zClerkId),
  parseServer: zodServerDataParser(zClerkId),
};

export const zUserName = z.string().min(1).max(32).brand<'UserName'>();
export type UserName = z.infer<typeof zUserName>;
export const userName = {
  parseClient: zodClientDataParser(zUserName),
  parseServer: zodServerDataParser(zUserName),
};

export const zUserEmail = z.email().brand<'UserEmail'>();
export type UserEmail = z.infer<typeof zUserEmail>;
export const userEmail = {
  parseClient: zodClientDataParser(zUserEmail),
  parseServer: zodServerDataParser(zUserEmail),
};
