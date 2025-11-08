import { z } from 'zod';

export const attachedCodeSchema = z.object({
  attachedCode: z.string().min(20, 'Snippet should contain at least 20 characters '),
});

export type AttachedCodeFormType = z.infer<typeof attachedCodeSchema>;
