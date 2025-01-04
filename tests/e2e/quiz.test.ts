import request from 'supertest';
import app, { startServer } from '../../src/index';
import { Server } from 'http';

let server: Server | undefined;

beforeAll(async () => {
	server = await startServer(true);
});

afterAll(async () => {
	if (server) {
		await server.close();
	}
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
	});
});
