import * as QuizService from '../../../src/services/quiz';
import Quiz from '../../../src/models/quiz';
import { ErrorEnum } from '../../../src/types/enums';
import { v4 as uuidv4 } from 'uuid';

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
						question:'Which method is not array method',
						options: [
							'Map',
							'Filter',
							'Reduce',
							'Trim',
						],
						answer: 'Trim',
					},
				],
			};

			const response = QuizService.createQuiz(payload);

			expect(response).toMatchObject(payload);
			expect(response.id).toBeDefined();
			expect(typeof response.id).toBe('string');
		});

		test('It should throw error if quiz with the same title already exists', () => {
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question:'Which method is not array method',
						options: [
							'Map',
							'Filter',
							'Reduce',
							'Trim',
						],
						answer: 'Trim',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getQuiz')
				.mockReturnValueOnce(new Map().set(payload.id,payload));

			expect(() => QuizService.createQuiz(payload)).toThrow(
				expect.objectContaining({
					type: ErrorEnum.UNPROCESSABLE_ENTITY,
					message: 'Quiz Already Exists',
				})
			);
		});
	});

	describe('getQuiz', () => {
		test('It should get a quiz based on id', () => {
			const id = uuidv4();
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question:'Which method is not array method',
						options: [
							'Map',
							'Filter',
							'Reduce',
							'Trim',
						],
						answer: 'Trim',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getQuiz')
				.mockReturnValueOnce(new Map().set(payload.id,payload));

			const response = QuizService.getQuiz(id);

			expect(response).toEqual(payload);
		});

		test('It should throw error if id doesnt exist', () => {
			const id = uuidv4();
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question:'Which method is not array method',
						options: [
							'Map',
							'Filter',
							'Reduce',
							'Trim',
						],
						answer: 'Trim',
					},
				],
				id,
			};
			jest
				.spyOn(Quiz, 'getQuiz')
				.mockReturnValueOnce(new Map().set(payload.id,payload));

				expect(() => QuizService.getQuiz(uuidv4())).toThrow(
					expect.objectContaining({
						type: ErrorEnum.NOT_FOUND,
						message: 'Quiz Not Found',
					})
				);
		});
	});
});
