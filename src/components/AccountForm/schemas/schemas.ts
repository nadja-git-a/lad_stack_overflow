import { z } from 'zod';

import { PASSWORD_REGEX } from '../../../variables';

export const usernameSchema = z.object({
  newUsername: z.string().min(5, 'Username should contain at least 5 characters'),
});

export type UsernameFormType = z.infer<typeof usernameSchema>;

export const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'Password should contain at least 6 characters')
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
      ),
    newPassword: z
      .string()
      .min(6, 'Password should contain at least 6 characters')
      .regex(
        PASSWORD_REGEX,
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
      ),
    confirmNewPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  });

export type PasswordFormType = z.infer<typeof passwordSchema>;
