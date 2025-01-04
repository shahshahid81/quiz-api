import { z } from 'zod';

export const submitAnswerSchema = z.object({
	sessionId: z.string({ message: 'Session Id is required' }),
	quizId: z.string({ message: 'Quiz Id is required' }),
	question: z.string({ message: 'Question is required' }),
	answer: z.string({ message: 'Answer is required' }),
});

export type SubmitAnswer = z.infer<typeof submitAnswerSchema>;
