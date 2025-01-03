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
				question: z.object({
					key: z
						.string({ message: 'Question key is required' })
						.transform((value) => value.trim()),
					value: z
						.string({ message: 'Question value is required' })
						.transform((value) => value.trim()),
				}),
				options: z
					.object({
						key: z
							.string({ message: 'Option title is required' })
							.transform((value) => value.trim()),
						value: z
							.string({ message: 'Option value is required' })
							.transform((value) => value.trim()),
					})
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
					const optionValues = data.options.map((option) => option.value);
					return optionValues.includes(data.answer);
				},
				{ message: 'Answer must be within the options' }
			)
			.refine(
				(data) => {
					const optionValues = data.options.map((option) => option.value);
					const optionKeys = data.options.map((option) => option.key);
					return (
						new Set(optionKeys).size === optionKeys.length &&
						new Set(optionValues).size === optionValues.length
					);
				},
				{ message: 'Options must be unique' }
			)
			.array()
			.nonempty(),
	})
	.refine(
		(data) => {
			const questionKeys = data.questions.map(
				(questionData) => questionData.question.key
			);
			const questionValues = data.questions.map(
				(questionData) => questionData.question.value
			);
			return (
				new Set(questionKeys).size === questionKeys.length &&
				new Set(questionValues).size === questionValues.length
			);
		},
		{ message: 'Questions must be unique', path: ['questions'] }
	);

export type CreateQuiz = z.infer<typeof createQuizSchema>;
