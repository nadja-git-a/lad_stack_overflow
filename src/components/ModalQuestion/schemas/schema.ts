import { z } from 'zod';

export const questionSchema = z.object({
  title: z.string().min(10, 'Title should contain at least 10 characters '),
  description: z.string().min(20, 'Description should contain at least 20 characters'),
  attachedCode: z.string().min(20, 'Code should contain at least 20 characters'),
});

export type questionFormType = z.infer<typeof questionSchema>;
