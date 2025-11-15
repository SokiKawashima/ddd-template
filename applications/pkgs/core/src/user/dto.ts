import z from 'zod';
import { zodServerDataParser } from '../+shared/helpers/zod.js';
import { zUserEmail, zUserId, zUserName } from './value-object.js';

export const zUserDto = z
  .object({
    userId: zUserId,
    name: zUserName,
    email: zUserEmail,
  })
  .readonly()
  .brand<'User'>();
export type UserDto = z.infer<typeof zUserDto>;
export const userDto = {
  parseServer: zodServerDataParser(zUserDto),
};
