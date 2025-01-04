import Quiz from '../models/quiz';
import Result from '../models/result';
import { ErrorEnum } from '../types/enums';
import { QuizDataType } from '../types/quiz';
import { CreateQuiz } from '../validation/createQuiz';
import { SubmitAnswer } from '../validation/submitAnswer';
import { isQuestionAlreadySubmitted } from './result';

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

export function submitQuestion(payload: SubmitAnswer): void {
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
}

function isQuestionValid(
	payload: Pick<SubmitAnswer, 'quiz_id' | 'question'>
): boolean {
	const quiz = getQuiz(payload.quiz_id);
	return quiz.questions.map((data) => data.question).includes(payload.question);
}

function isAnswerValid(
	payload: Pick<SubmitAnswer, 'quiz_id' | 'answer' | 'question'>
): boolean {
	const quiz = getQuiz(payload.quiz_id);
	return quiz.questions
		.filter((data) => data.question === payload.question)
		.map((data) => data.options)
		.flat()
		.includes(payload.answer);
}
