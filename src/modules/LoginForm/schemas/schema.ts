import { z } from 'zod';

import { PASSWORD_REGEX } from '../../../variables';

export const loginSchema = z.object({
  username: z.string().min(5, 'Username should contain at least 5 characters'),
  password: z
    .string()
    .min(6, 'Password should contain at least 6 characters')
    .regex(
      PASSWORD_REGEX,
      'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
    ),
});

export type LoginFormType = z.infer<typeof loginSchema>;
