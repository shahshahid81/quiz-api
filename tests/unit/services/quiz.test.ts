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
		test('It should successfully submit quiz question', () => {
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
				session_id: '1',
				quiz_id: quizData.id,
				question: 'What is the correct way to write a JavaScript array?',
				answer: "var colors = ['red', 'green', 'blue']",
			};
			jest.spyOn(QuizService, 'submitQuestion');

			QuizService.submitQuestion(payload);

			expect(QuizService.submitQuestion).toHaveBeenCalledTimes(1);
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
				session_id: '1',
				quiz_id: uuidv4(),
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
				session_id: '1',
				quiz_id: quizData.id,
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
				session_id: '1',
				quiz_id: quizData.id,
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
});
