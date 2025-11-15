import z from 'zod';
import { zodServerDataParser } from '../+shared/helpers/zod.js';
import { zUserEmail, zUserId, zUserName } from './value-object.js';

export const zUser = z
  .object({
    userId: zUserId,
    name: zUserName,
    email: zUserEmail,
    createdAt: z.date(),
  })
  .readonly()
  .brand<'User'>();
export type User = z.infer<typeof zUser>;
export const user = {
  parseServer: zodServerDataParser(zUser),
};
