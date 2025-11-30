import z from 'zod';
import { zodServerDataParser } from '../+shared/helpers/zod.js';
import { zUserEmail, zUserId, zUserName } from './value-object.js';

export const zCurrentUserDto = z
  .object({
    userId: zUserId,
    name: zUserName,
    email: zUserEmail,
  })
  .readonly()
  .brand<'User'>();
export type CurrentUserDto = z.infer<typeof zCurrentUserDto>;
export const currentUserDto = {
  parseServer: zodServerDataParser(zCurrentUserDto),
};

export const zProfileDto = z
  .object({
    name: zUserName,
  })
  .brand<'Profile'>();
export type ProfileDto = z.infer<typeof zProfileDto>;
export const profileDto = {
  parseServer: zodServerDataParser(zProfileDto),
};
