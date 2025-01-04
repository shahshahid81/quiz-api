# quiz-api

## Installation

1. Run `npm install` to install all the required packages after cloning the repository.
2. To run the development server, run `npm run dev`.
3. To build the production server, run `npm run build` and to run the production server after building, run `npm run start`.

Run `npm run test:unit` command to execute unit testing and `npm run test:e2e` to run the integration testing.

To use docker to run the server, run `docker compose up` command. Please note that if there are any changes, the api server has to be built again.

Limitations:

1. Ideally, ids should have been used for questions and options while submitting answers but instead of ids, string values of questions and options are used.
2. There is no standard expection handling mechanism used to throw api errors and instead `routeHandler` is used in route file for the 4 APIs.
3. PORT has been hardcoded instead of using .env file for ease of running the project.
4. Since there is no api to create session, random session_id has to be generated for submission of the answers.

APIs:

1. Create QUIZ.

Endpoint: POST `http://localhost:3000/quiz`
Request Payload:

```json
{
	"title": "Javascript",
	"questions": [
		{
			"question": "What is the correct way to write a JavaScript array?",
			"options": [
				"var colors = (1:'red', 2:'green', 3:'blue')",
				"var colors = 'red', 'green', 'blue'",
				"var colors = ['red', 'green', 'blue']",
				"var colors = (red, green, blue)"
			],
			"answer": "var colors = ['red', 'green', 'blue']"
		},
		{
			"question": "How do you write a conditional statement in JavaScript?",
			"options": [
				"if (i = 4) { ... }",
				"if i = 4 then { ... }",
				"if i == 4 then { ... }",
				"if (i == 4) { ... }"
			],
			"answer": "if (i == 4) { ... }"
		},
		{
			"question": "Which built-in method removes the last element from an array and returns that element?",
			"options": ["pop()", "push()", "shift()", "unshift()"],
			"answer": "pop()"
		},
		{
			"question": "What is the correct syntax for referring to an external script called 'myfile.js'?",
			"options": [
				"<script src='myfile.js'>",
				"<script href='myfile.js'>",
				"<script name='myfile.js'>",
				"<script file='myfile.js'>"
			],
			"answer": "<script src='myfile.js'>"
		},
		{
			"question": "What is the result of '10' + 5 in JavaScript?",
			"options": ["105", "15", "510", "Error"],
			"answer": "105"
		}
	]
}
```

Response:

```json
{
	"success": true,
	"quiz": {
		"title": "Javascript",
		"questions": [
			{
				"question": "What is the correct way to write a JavaScript array?",
				"options": [
					"var colors = (1:'red', 2:'green', 3:'blue')",
					"var colors = 'red', 'green', 'blue'",
					"var colors = ['red', 'green', 'blue']",
					"var colors = (red, green, blue)"
				],
				"answer": "var colors = ['red', 'green', 'blue']"
			},
			{
				"question": "How do you write a conditional statement in JavaScript?",
				"options": [
					"if (i = 4) { ... }",
					"if i = 4 then { ... }",
					"if i == 4 then { ... }",
					"if (i == 4) { ... }"
				],
				"answer": "if (i == 4) { ... }"
			},
			{
				"question": "Which built-in method removes the last element from an array and returns that element?",
				"options": ["pop()", "push()", "shift()", "unshift()"],
				"answer": "pop()"
			},
			{
				"question": "What is the correct syntax for referring to an external script called 'myfile.js'?",
				"options": [
					"<script src='myfile.js'>",
					"<script href='myfile.js'>",
					"<script name='myfile.js'>",
					"<script file='myfile.js'>"
				],
				"answer": "<script src='myfile.js'>"
			},
			{
				"question": "What is the result of '10' + 5 in JavaScript?",
				"options": ["105", "15", "510", "Error"],
				"answer": "105"
			}
		],
		"id": "b5db0271-28e8-4dbe-b574-d1d8e4fa4e6a"
	}
}
```

2. Get Quiz
   Endpoint: GET `http://localhost:3000/quiz/:id`

Response:

```json
{
	"success": true,
	"quiz": {
		"title": "Javascript",
		"questions": [
			{
				"question": "What is the correct way to write a JavaScript array?",
				"options": [
					"var colors = (1:'red', 2:'green', 3:'blue')",
					"var colors = 'red', 'green', 'blue'",
					"var colors = ['red', 'green', 'blue']",
					"var colors = (red, green, blue)"
				]
			},
			{
				"question": "How do you write a conditional statement in JavaScript?",
				"options": [
					"if (i = 4) { ... }",
					"if i = 4 then { ... }",
					"if i == 4 then { ... }",
					"if (i == 4) { ... }"
				]
			},
			{
				"question": "Which built-in method removes the last element from an array and returns that element?",
				"options": ["pop()", "push()", "shift()", "unshift()"]
			},
			{
				"question": "What is the correct syntax for referring to an external script called 'myfile.js'?",
				"options": [
					"<script src='myfile.js'>",
					"<script href='myfile.js'>",
					"<script name='myfile.js'>",
					"<script file='myfile.js'>"
				]
			},
			{
				"question": "What is the result of '10' + 5 in JavaScript?",
				"options": ["105", "15", "510", "Error"]
			}
		],
		"id": "8c47c8f0-e668-4838-babb-a1ab88aca312"
	}
}
```

3. Submit Quiz Question
   Endpoint: POST `http://localhost:3000/quiz/submit`
   Request Payload:

```json
{
	"sessionId": "1",
	"quizId": "8c47c8f0-e668-4838-babb-a1ab88aca312",
	"question": "What is the result of '10' + 5 in JavaScript?",
	"answer": "105"
}
```

Response:

```json
{
	"success": true,
	"result": {
		"isCorrect": true
	}
}
```

4. Get Quiz Result
   Endpoint: GET `http://localhost:3000/quiz/:quizId/:sessionId`

Response:

```json
{
	"success": true,
	"result": {
		"total": 5,
		"correct": 4,
		"result": [
			{
				"isCorrect": true,
				"userAnswer": "105"
			},
			{
				"isCorrect": true,
				"userAnswer": "var colors = ['red', 'green', 'blue']"
			},
			{
				"isCorrect": false,
				"userAnswer": "if i = 4 then { ... }",
				"correctAnswer": "if (i == 4) { ... }"
			},
			{
				"isCorrect": true,
				"userAnswer": "pop()"
			},
			{
				"isCorrect": true,
				"userAnswer": "<script src='myfile.js'>"
			}
		]
	}
}
```
