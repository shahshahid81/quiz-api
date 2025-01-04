import { z } from 'zod';

export const submitAnswerSchema = z.object({
	session_id: z.string({ message: 'Session Id is required' }),
	quiz_id: z.string({ message: 'Quiz Id is required' }),
	question: z.string({ message: 'Question is required' }),
	answer: z.string({ message: 'Answer is required' }),
});

export type SubmitAnswer = z.infer<typeof submitAnswerSchema>;
