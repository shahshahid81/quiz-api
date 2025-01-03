import { z } from 'zod';

export const createQuizSchema = z
	.object({
		title: z
			.string({ message: 'Title is required' })
			.trim()
			.min(5, 'Title must have at least 5 characters')
			.max(75, 'Title must have at most 75 characters')
			.transform((value) => value.trim()),
		questions: z
			.object({
				question: z
					.string({ message: 'Question value is required' })
					.transform((value) => value.trim()),
				options: z
					.string({ message: 'Option value is required' })
					.transform((value) => value.trim())
					.array()
					.refine((payload) => payload.length === 4, {
						message:
							'Exactly 4 options must be sent for creating possible answers',
					}),
				answer: z
					.string({ message: 'Answer is required' })
					.transform((value) => value.trim()),
			})
			.refine(
				(data) => {
					return data.options.includes(data.answer);
				},
				{ message: 'Answer must be within the options' }
			)
			.refine(
				(data) => {
					return new Set(data.options).size === data.options.length;
				},
				{ message: 'Options must be unique' }
			)
			.array(),
	})
	.refine((payload) => payload.questions.length, {
		message: 'Questions array cannot be empty',
		path: ['questions'],
	})
	.refine(
		(payload) => {
			const questionKeys = payload.questions.map(
				(questionData) => questionData.question
			);
			return new Set(questionKeys).size === questionKeys.length;
		},
		{ message: 'Questions must be unique', path: ['questions'] }
	);

export type CreateQuiz = z.infer<typeof createQuizSchema>;
