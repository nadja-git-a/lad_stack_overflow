import { z } from 'zod';

export const commentSchema = z.object({
  comment: z.string().min(20, 'A comment should contain at least 20 characters'),
});

export type CommentFormType = z.infer<typeof commentSchema>;
