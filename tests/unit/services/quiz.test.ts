import * as QuizService from '../../../src/services/quiz';
import * as ResultService from '../../../src/services/result';
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
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
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
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValueOnce(new Map().set(payload.id, payload));

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
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id,
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValueOnce(new Map().set(payload.id, payload));

			const response = QuizService.getQuiz(id);

			expect(response).toEqual(payload);
		});

		test('It should throw error if id doesnt exist', () => {
			const id = uuidv4();
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id,
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValueOnce(new Map().set(payload.id, payload));

			expect(() => QuizService.getQuiz(uuidv4())).toThrow(
				expect.objectContaining({
					type: ErrorEnum.NOT_FOUND,
					message: 'Quiz Not Found',
				})
			);
		});
	});

	describe('getQuizWithHiddenAnswers', () => {
		test('It should get a quiz based on id without answers', () => {
			const id = uuidv4();
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id,
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValueOnce(new Map().set(payload.id, payload));

			const expectedPayload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
					},
				],
				id,
			};

			const response = QuizService.getQuizWithHiddenAnswers(id);

			expect(response).toEqual(expectedPayload);
		});

		test('It should throw error if id doesnt exist', () => {
			const id = uuidv4();
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id,
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValueOnce(new Map().set(payload.id, payload));

			expect(() => QuizService.getQuiz(uuidv4())).toThrow(
				expect.objectContaining({
					type: ErrorEnum.NOT_FOUND,
					message: 'Quiz Not Found',
				})
			);
		});
	});

	describe('submitQuestion', () => {
		test('It should successfully submit quiz question and return isCorrect as true', () => {
			const quizData = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValue(new Map().set(quizData.id, quizData));

			const payload = {
				sessionId: '1',
				quizId: quizData.id,
				question: 'What is the correct way to write a JavaScript array?',
				answer: "var colors = ['red', 'green', 'blue']",
			};

			const response = QuizService.submitQuestion(payload);

			expect(response).toEqual({
				isCorrect: true,
			});
		});

		test('It should successfully submit quiz question and return isCorrect as false', () => {
			const quizData = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValue(new Map().set(quizData.id, quizData));

			const payload = {
				sessionId: '1',
				quizId: quizData.id,
				question: "What is the result of '10' + 5 in JavaScript?",
				answer: '15',
			};

			const response = QuizService.submitQuestion(payload);

			expect(response).toEqual({
				isCorrect: false,
				correctAnswer: '105',
			});
		});

		test('It should fail if quiz id is incorrect', () => {
			const quizData = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValue(new Map().set(quizData.id, quizData));

			const payload = {
				sessionId: '1',
				quizId: uuidv4(),
				question: 'What is the correct way to write a JavaScript array?',
				answer: "var colors = ['red', 'green', 'blue']",
			};

			expect(() => QuizService.submitQuestion(payload)).toThrow(
				expect.objectContaining({
					type: ErrorEnum.NOT_FOUND,
					message: 'Quiz Not Found',
				})
			);
		});

		test('It should fail if question is incorrect', () => {
			const quizData = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValue(new Map().set(quizData.id, quizData));

			const payload = {
				sessionId: '1',
				quizId: quizData.id,
				question: 'Test value',
				answer: "var colors = ['red', 'green', 'blue']",
			};

			expect(() => QuizService.submitQuestion(payload)).toThrow(
				expect.objectContaining({
					type: ErrorEnum.NOT_FOUND,
					message: 'Question Not Found',
				})
			);
		});

		test('It should fail if option is incorrect', () => {
			const quizData = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest
				.spyOn(Quiz, 'getAll')
				.mockReturnValue(new Map().set(quizData.id, quizData));

			const payload = {
				sessionId: '1',
				quizId: quizData.id,
				question: 'What is the correct way to write a JavaScript array?',
				answer: 'Test',
			};

			expect(() => QuizService.submitQuestion(payload)).toThrow(
				expect.objectContaining({
					type: ErrorEnum.NOT_FOUND,
					message: 'Option Not Found',
				})
			);
		});
	});

	describe('getQuizResult', () => {
		test('It should fail if all the quiz questions are not submitted', () => {
			const quizDataPayload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest.spyOn(Quiz, 'getOne').mockReturnValueOnce(quizDataPayload);

			const resultDataPayload = [
				{
					quizId: quizDataPayload.id,
					question: 'What is the correct way to write a JavaScript array?',
					answer: "var colors = ['red', 'green', 'blue']",
				},
			];
			jest
				.spyOn(ResultService, 'getResultData')
				.mockReturnValueOnce(resultDataPayload);

			expect(() =>
				QuizService.getQuizResult({
					quizId: quizDataPayload.id,
					sessionId: '1',
				})
			).toThrow(
				expect.objectContaining({
					type: ErrorEnum.UNPROCESSABLE_ENTITY,
					message: 'Submit all quiz questions to get result data',
				})
			);
		});

		test('It should return 5 total and 4 correct questions with correct answer only for incorrect question', () => {
			const quizDataPayload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
							'var colors = (red, green, blue)',
						],
						answer: "var colors = ['red', 'green', 'blue']",
					},
					{
						question: 'How do you write a conditional statement in JavaScript?',
						options: [
							'if (i = 4) { ... }',
							'if i = 4 then { ... }',
							'if i == 4 then { ... }',
							'if (i == 4) { ... }',
						],
						answer: 'if (i == 4) { ... }',
					},
					{
						question:
							'Which built-in method removes the last element from an array and returns that element?',
						options: ['pop()', 'push()', 'shift()', 'unshift()'],
						answer: 'pop()',
					},
					{
						question:
							"What is the correct syntax for referring to an external script called 'myfile.js'?",
						options: [
							"<script src='myfile.js'>",
							"<script href='myfile.js'>",
							"<script name='myfile.js'>",
							"<script file='myfile.js'>",
						],
						answer: "<script src='myfile.js'>",
					},
					{
						question: "What is the result of '10' + 5 in JavaScript?",
						options: ['105', '15', '510', 'Error'],
						answer: '105',
					},
				],
				id: uuidv4(),
			};
			jest.spyOn(Quiz, 'getOne').mockReturnValueOnce(quizDataPayload);

			const resultDataPayload = [
				{
					quizId: quizDataPayload.id,
					question: 'What is the correct way to write a JavaScript array?',
					answer: "var colors = ['red', 'green', 'blue']",
				},
				{
					quizId: quizDataPayload.id,
					question: 'How do you write a conditional statement in JavaScript?',
					answer: 'if i = 4 then { ... }',
				},
				{
					quizId: quizDataPayload.id,
					question:
						'Which built-in method removes the last element from an array and returns that element?',
					answer: 'pop()',
				},
				{
					quizId: quizDataPayload.id,
					question:
						"What is the correct syntax for referring to an external script called 'myfile.js'?",
					answer: "<script src='myfile.js'>",
				},
				{
					quizId: quizDataPayload.id,
					question: "What is the result of '10' + 5 in JavaScript?",
					answer: '105',
				},
			];
			jest
				.spyOn(ResultService, 'getResultData')
				.mockReturnValueOnce(resultDataPayload);

			const expectedPayload = {
				total: 5,
				correct: 4,
				result: [
					{
						isCorrect: true,
						userAnswer: "var colors = ['red', 'green', 'blue']",
					},
					{
						isCorrect: false,
						userAnswer: 'if i = 4 then { ... }',
						correctAnswer: 'if (i == 4) { ... }',
					},
					{
						isCorrect: true,
						userAnswer: 'pop()',
					},
					{
						isCorrect: true,
						userAnswer: "<script src='myfile.js'>",
					},
					{
						isCorrect: true,
						userAnswer: '105',
					},
				],
			};

			const response = QuizService.getQuizResult({
				quizId: quizDataPayload.id,
				sessionId: '1',
			});

			expect(response).toEqual(expectedPayload);
		});
	});
});
