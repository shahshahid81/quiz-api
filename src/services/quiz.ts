import Quiz from '../models/quiz';
import Result from '../models/result';
import { ErrorEnum } from '../types/enums';
import {
	GetQuizResultPayloadType,
	GetQuizResultResponseType,
	GetQuizType,
	QuestionType,
	QuizDataType,
	SubmitQuestionResultType,
} from '../types/quiz';
import { CreateQuiz } from '../validation/createQuiz';
import { SubmitAnswer } from '../validation/submitAnswer';
import { getResultData, isQuestionAlreadySubmitted } from './result';

export function createQuiz({ title, questions }: CreateQuiz): QuizDataType {
	const quizMap = Quiz.getAll();
	if ([...quizMap.values()].map((value) => value.title).includes(title)) {
		throw {
			type: ErrorEnum.UNPROCESSABLE_ENTITY,
			message: 'Quiz Already Exists',
		};
	}

	const quiz = { title, questions };
	return Quiz.insert(quiz);
}

export function getQuiz(id: string): QuizDataType {
	const quizData = Quiz.getOne(id);
	if (!quizData) {
		throw {
			type: ErrorEnum.NOT_FOUND,
			message: 'Quiz Not Found',
		};
	}
	return quizData;
}

export function getQuizWithHiddenAnswers(id: string): GetQuizType {
	const quizData = getQuiz(id);
	const questions = quizData.questions.map((questionData) => {
		const data: Omit<QuestionType, 'answer'> & {
			answer?: QuestionType['answer'];
		} = { ...questionData };
		delete data.answer;
		return data;
	});
	return { ...quizData, questions };
}

export function submitQuestion(
	payload: SubmitAnswer
): SubmitQuestionResultType {
	if (!isQuestionValid(payload)) {
		throw {
			type: ErrorEnum.NOT_FOUND,
			message: 'Question Not Found',
		};
	}

	if (!isAnswerValid(payload)) {
		throw {
			type: ErrorEnum.NOT_FOUND,
			message: 'Option Not Found',
		};
	}

	if (isQuestionAlreadySubmitted(payload)) {
		throw {
			type: ErrorEnum.UNPROCESSABLE_ENTITY,
			message: 'Question Already Submitted',
		};
	}
	Result.insert(payload);

	const correctAnswer = fetchCorrectAnswer(payload);
	const isCorrect = correctAnswer === payload.answer;

	const response: SubmitQuestionResultType = {
		isCorrect,
	};

	if (!response.isCorrect && correctAnswer) {
		response.correctAnswer = correctAnswer;
	}
	return response;
}

export function getQuizResult(
	payload: GetQuizResultPayloadType
): GetQuizResultResponseType {
	const quiz = getQuiz(payload.quizId);
	const resultData = getResultData(payload.sessionId);

	if (quiz.questions.length !== resultData.length) {
		throw {
			type: ErrorEnum.UNPROCESSABLE_ENTITY,
			message: 'Submit all quiz questions to get result data',
		};
	}

	const total = resultData.length;
	let correct = 0;
	const result: GetQuizResultResponseType['result'] = [];
	const questionAnswerMap: Map<string, string> = new Map();
	quiz.questions.forEach((questionData) => {
		questionAnswerMap.set(questionData.question, questionData.answer);
	});

	resultData.forEach((resultEntry) => {
		let isCorrect;
		const correctAnswer = questionAnswerMap.get(resultEntry.question)!;
		if (correctAnswer === resultEntry.answer) {
			correct++;
			isCorrect = true;
		} else {
			isCorrect = false;
		}
		const data: GetQuizResultResponseType['result'][number] = {
			isCorrect,
			userAnswer: resultEntry.answer,
		};
		if (!isCorrect) {
			data.correctAnswer = correctAnswer;
		}
		result.push(data);
	});

	return { total, correct, result };
}

function isQuestionValid(
	payload: Pick<SubmitAnswer, 'quizId' | 'question'>
): boolean {
	const quiz = getQuiz(payload.quizId);
	return quiz.questions.map((data) => data.question).includes(payload.question);
}

function isAnswerValid(
	payload: Pick<SubmitAnswer, 'quizId' | 'answer' | 'question'>
): boolean {
	const quiz = getQuiz(payload.quizId);
	return quiz.questions
		.filter((data) => data.question === payload.question)
		.map((data) => data.options)
		.flat()
		.includes(payload.answer);
}

function fetchCorrectAnswer(
	payload: SubmitAnswer
): QuestionType['answer'] | null {
	const quiz = getQuiz(payload.quizId);
	const question = quiz.questions.find(
		(data) => data.question === payload.question
	);
	return question?.answer ?? null;
}
