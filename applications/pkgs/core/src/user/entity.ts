import * as z from 'zod';
import { zodServerDataParser } from '../+shared/helpers/zod.js';
import { zClerkId, zUserEmail, zUserId, zUserName } from './value-object.js';

export const zUser = z
  .object({
    userId: zUserId,
    clerkId: zClerkId,
    name: zUserName,
    email: zUserEmail,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .readonly()
  .brand<'User'>();
export type User = z.infer<typeof zUser>;
export const User = {
  parseServer: zodServerDataParser(zUser),
};

export const zAuthenticatedUser = z
  .object({
    userId: zUserId,
    clerkId: zClerkId,
    name: zUserName,
    email: zUserEmail,
  })
  .brand<'AuthenticatedUser'>();
export type AuthenticatedUser = z.infer<typeof zAuthenticatedUser>;
export const AuthenticatedUser = {
  parseServer: zodServerDataParser(zAuthenticatedUser),
};
