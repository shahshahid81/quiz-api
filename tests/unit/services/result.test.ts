import * as ResultService from '../../../src/services/result';
import Quiz from '../../../src/models/quiz';
import { v4 as uuidv4 } from 'uuid';
import Result from '../../../src/models/result';
import { ErrorEnum } from '../../../src/types/enums';

afterEach(() => {
	jest.clearAllMocks();
});

describe('Result Service', () => {
	describe('isQuestionAlreadySubmitted', () => {
		test('It should return true if the question is submitted', () => {
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

			const resultData = [
				{
					quiz_id: quizData.id,
					question: 'How do you write a conditional statement in JavaScript?',
					answer: 'if i = 4 then { ... }',
				},
			];
			const session_id = '1';
			jest
				.spyOn(Result, 'getAll')
				.mockReturnValue(new Map().set(session_id, resultData));

			const payload = {
				session_id,
				quiz_id: quizData.id,
				question: 'How do you write a conditional statement in JavaScript?',
				answer: 'if i = 4 then { ... }',
			};

			const response = ResultService.isQuestionAlreadySubmitted(payload);

			expect(response).toBe(true);
		});

		test('It should return false if the question is not submitted', () => {
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
				question: 'How do you write a conditional statement in JavaScript?',
				answer: 'if i = 4 then { ... }',
			};

			const response = ResultService.isQuestionAlreadySubmitted(payload);

			expect(response).toBe(false);
		});
	});

	describe('getResultData', () => {
		test('It should get result data based on id', () => {
			const resultData = [
				{
					quiz_id: uuidv4(),
					question: 'How do you write a conditional statement in JavaScript?',
					answer: 'if i = 4 then { ... }',
				},
			];
			const session_id = '1';
			jest
				.spyOn(Result, 'getAll')
				.mockReturnValue(new Map().set(session_id, resultData));

			const response = ResultService.getResultData(session_id);

			expect(response).toEqual(resultData);
		});

		test('It should throw error if id doesnt exist', () => {
			const resultData = [
				{
					quiz_id: uuidv4(),
					question: 'How do you write a conditional statement in JavaScript?',
					answer: 'if i = 4 then { ... }',
				},
			];
			const session_id = '1';
			jest
				.spyOn(Result, 'getAll')
				.mockReturnValue(new Map().set(session_id, resultData));

			expect(() => ResultService.getResultData('2')).toThrow(
				expect.objectContaining({
					type: ErrorEnum.NOT_FOUND,
					message: 'Quiz Session Not Found',
				})
			);
		});
	});
});
