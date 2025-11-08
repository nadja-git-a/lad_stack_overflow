import { z } from 'zod';

export const codeSchema = z.object({
  code: z.string().min(20, 'Snippet should contain at least 20 characters'),
});

export type codeFormType = z.infer<typeof codeSchema>;
