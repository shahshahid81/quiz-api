import request from 'supertest';
import app, { startServer } from '../../src/app';
import { Server } from 'http';

let server: Server | undefined;

beforeAll(() => {
	server = startServer();
});

afterAll(() => {
	server!.close();
});

describe('Quiz APIs', () => {
	describe('Create Quiz', () => {
		test('It should create a quiz', async () => {
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

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('quiz');
			expect(response.body.quiz).toHaveProperty('id');
			expect(typeof response.body.quiz.id).toBe('string');
			expect(response.body.quiz).toMatchObject(payload);
		});

		test('It should throw error if title is less than 5 characters', async () => {
			const payload = {
				title: 'Java',
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

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Title must have at least 5 characters',
						path: 'title',
					},
				],
			});
		});

		test('It should throw error if title is more than 75 characters', async () => {
			const payload = {
				title:
					'JavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScript',
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

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Title must have at most 75 characters',
						path: 'title',
					},
				],
			});
		});

		test('It should throw error if title is less than 5 characters even if more than 5 spaces are sent', async () => {
			const payload = {
				title: '           ',
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

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Title must have at least 5 characters',
						path: 'title',
					},
				],
			});
		});

		test('It should throw error if less than 4 options are sent', async () => {
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = 'red', 'green', 'blue'",
							"var colors = ['red', 'green', 'blue']",
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

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message:
							'Exactly 4 options must be sent for creating possible answers',
						path: 'questions.0.options',
					},
				],
			});
		});

		test('It should throw error if answer is not from the options list', async () => {
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
						answer: "var colors = ['red', 'green', 'bluee']",
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

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Answer must be within the options',
						path: 'questions.0',
					},
				],
			});
		});

		test('It should throw error if duplicate options are present in the list', async () => {
			const payload = {
				title: 'Javascript',
				questions: [
					{
						question: 'What is the correct way to write a JavaScript array?',
						options: [
							"var colors = (1:'red', 2:'green', 3:'blue')",
							"var colors = ['red', 'green', 'blue']",
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
						answer: '15',
					},
				],
			};

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Options must be unique',
						path: 'questions.0',
					},
				],
			});
		});

		test('It should throw error if duplicate questions are present in the list', async () => {
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
						question: 'What is the correct way to write a JavaScript array?',
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
						answer: '15',
					},
				],
			};

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Questions must be unique',
						path: 'questions',
					},
				],
			});
		});

		test('It should throw error if no questions are present in the list', async () => {
			const payload = {
				title: 'Javascript',
				questions: [],
			};

			const response = await request(app).post('/quiz').send(payload);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty('errors');
			expect(response.body).toEqual({
				errors: [
					{
						message: 'Questions array cannot be empty',
						path: 'questions',
					},
				],
			});
		});
	});

	describe('Get Quiz', () => {
		test('It should return the quiz data', async () => {
			const payload = {
				title: 'Javascript 2',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(payload)
				.expect(201);
			const expectedPayload = {
				title: 'Javascript 2',
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
			};

			const getResponse = await request(app).get(
				'/quiz/' + createResponse.body.quiz.id
			);

			expect(getResponse.status).toBe(200);
			expect(getResponse.body).toHaveProperty('quiz');
			expect(getResponse.body.quiz).toMatchObject(expectedPayload);
		});

		test('It should return 404 if no quiz data found', async () => {
			const response = await request(app).get('/quiz/test');
			expect(response.status).toBe(404);
		});
	});

	describe('Sumbit Quiz Answer', () => {
		test('It should submit the answer for quiz and return isCorrect as true in response', async () => {
			const createPayload = {
				title: 'Javascript 1',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(createPayload)
				.expect(201);

			const submitPayload = {
				sessionId: '1',
				quizId: createResponse.body.quiz.id,
				question: createPayload.questions[0]!.question,
				answer: createPayload.questions[0]!.answer,
			};

			const expectedPayload = {
				isCorrect: true,
			};

			const submitResponse = await request(app)
				.post('/quiz/submit')
				.send(submitPayload);

			expect(submitResponse.status).toBe(200);
			expect(submitResponse.body).toHaveProperty('result');
			expect(submitResponse.body.result).toMatchObject(expectedPayload);
		});

		test('It should submit the answer for quiz and return isCorrect as false and correctAnswer in response', async () => {
			const createPayload = {
				title: 'Javascript 3',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(createPayload)
				.expect(201);

			const submitPayload = {
				sessionId: '1',
				quizId: createResponse.body.quiz.id,
				question: createPayload.questions[0]!.question,
				answer: createPayload.questions[0]!.options[0]!,
			};

			const expectedPayload = {
				isCorrect: false,
				correctAnswer: createPayload.questions[0]!.answer,
			};

			const submitResponse = await request(app)
				.post('/quiz/submit')
				.send(submitPayload);

			expect(submitResponse.status).toBe(200);
			expect(submitResponse.body).toHaveProperty('result');
			expect(submitResponse.body.result).toMatchObject(expectedPayload);
		});

		test('It should return 404 if quiz id is incorrect', async () => {
			const createPayload = {
				title: 'Javascript 4',
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
			await request(app).post('/quiz').send(createPayload).expect(201);

			const submitPayload = {
				sessionId: '1',
				quizId: 'Test',
				question: createPayload.questions[0]!.question,
				answer: createPayload.questions[0]!.options[0]!,
			};

			const submitResponse = await request(app)
				.post('/quiz/submit')
				.send(submitPayload);

			expect(submitResponse.status).toBe(404);
			expect(submitResponse.body).toMatchObject({
				message: 'Quiz Not Found',
				success: false,
			});
		});

		test('It should return 404 if question is incorrect', async () => {
			const createPayload = {
				title: 'Javascript 5',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(createPayload)
				.expect(201);

			const submitPayload = {
				sessionId: '1',
				quizId: createResponse.body.quiz.id,
				question: 'Test',
				answer: createPayload.questions[0]!.options[0]!,
			};

			const submitResponse = await request(app)
				.post('/quiz/submit')
				.send(submitPayload);

			expect(submitResponse.status).toBe(404);
			expect(submitResponse.body).toMatchObject({
				message: 'Question Not Found',
				success: false,
			});
		});

		test('It should return 404 if option is incorrect', async () => {
			const createPayload = {
				title: 'Javascript 6',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(createPayload)
				.expect(201);

			const submitPayload = {
				sessionId: '1',
				quizId: createResponse.body.quiz.id,
				question: createPayload.questions[0]!.question,
				answer: 'Test',
			};

			const submitResponse = await request(app)
				.post('/quiz/submit')
				.send(submitPayload);

			expect(submitResponse.status).toBe(404);
			expect(submitResponse.body).toMatchObject({
				message: 'Option Not Found',
				success: false,
			});
		});
	});

	describe('Get Quiz Result', () => {
		test('it should return quiz result of total 5 questions and 3 correct options along with correct answers for the incorrect options', async () => {
			const createPayload = {
				title: 'Javascript 7',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(createPayload)
				.expect(201);

			const sessionId = '100';
			const submitQuizPromises = createPayload.questions.map(
				(questionData, index) => {
					return request(app)
						.post('/quiz/submit')
						.send({
							sessionId,
							quizId: createResponse.body.quiz.id,
							question: questionData.question,
							answer:
								index <= 2 ? questionData.answer : questionData.options[1],
						})
						.expect(200);
				}
			);
			await Promise.all(submitQuizPromises);
			const expectedPayload = {
				total: 5,
				correct: 3,
				result: [
					{
						isCorrect: true,
						userAnswer: "var colors = ['red', 'green', 'blue']",
					},
					{ isCorrect: true, userAnswer: 'if (i == 4) { ... }' },
					{ isCorrect: true, userAnswer: 'pop()' },
					{
						isCorrect: false,
						userAnswer: "<script href='myfile.js'>",
						correctAnswer: "<script src='myfile.js'>",
					},
					{ isCorrect: false, userAnswer: '15', correctAnswer: '105' },
				],
			};

			const getResponse = await request(app).get(
				`/quiz/${createResponse.body.quiz.id}/${sessionId}`
			);

			expect(getResponse.status).toBe(200);
			expect(getResponse.body).toHaveProperty('result');
			expect(getResponse.body.result).toMatchObject(expectedPayload);
		});

		test('it should throw error if all quiz questions are not submitted', async () => {
			const createPayload = {
				title: 'Javascript 8',
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
			const createResponse = await request(app)
				.post('/quiz')
				.send(createPayload)
				.expect(201);

			const sessionId = '200';
			await request(app)
				.post('/quiz/submit')
				.send({
					sessionId,
					quizId: createResponse.body.quiz.id,
					question: createPayload.questions[0]!.question,
					answer: createPayload.questions[0]!.answer,
				})
				.expect(200);

			const getResponse = await request(app).get(
				`/quiz/${createResponse.body.quiz.id}/${sessionId}`
			);

			expect(getResponse.status).toBe(422);
			expect(getResponse.body).toMatchObject({
				success: false,
				message: 'Submit all quiz questions to get result data',
			});
		});
	});
});
