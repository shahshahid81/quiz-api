import * as QuizService from '../../../src/services/quiz';
import Quiz from '../../../src/models/quiz';
import { ErrorEnum } from '../../../src/types/enums';

afterEach(() => {
	jest.clearAllMocks();
});

describe('Quiz Service', () => {
	describe('createQuiz', () => {
		test('It should create a quiz', () => {
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: {
							key: 'Which method is not array method',
							value: 'ARRAY_METHOD',
						},
						options: [
							{
								key: 'Map',
								value: 'MAP',
							},
							{
								key: 'Filter',
								value: 'FILTER',
							},
							{
								key: 'Reduce',
								value: 'REDUCE',
							},
							{
								key: 'Trim',
								value: 'TRIM',
							},
						],
						answer: 'TRIM',
					},
				],
			};

			const result = QuizService.createQuiz(payload);

			expect(result).toEqual(payload);
		});

		test('It should throw error if quiz with the same title already exists', () => {
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: {
							key: 'Which method is not array method',
							value: 'ARRAY_METHOD',
						},
						options: [
							{
								key: 'Map',
								value: 'MAP',
							},
							{
								key: 'Filter',
								value: 'FILTER',
							},
							{
								key: 'Reduce',
								value: 'REDUCE',
							},
							{
								key: 'Trim',
								value: 'TRIM',
							},
						],
						answer: 'TRIM',
					},
				],
			};
			jest
				.spyOn(Quiz, 'getQuiz')
				.mockReturnValueOnce(new Map().set(payload.title, payload));

			expect(() => QuizService.createQuiz(payload)).toThrow(
				expect.objectContaining({
					type: ErrorEnum.UNPROCESSABLE_ENTITY,
					message: 'Quiz Already Exists',
				})
			);
		});
	});
});
