import Quiz from '../models/quiz';
import Result from '../models/result';
import { ErrorEnum } from '../types/enums';
import {
	GetQuizType,
	QuestionType,
	QuizDataType,
	SubmitQuestionResultType,
} from '../types/quiz';
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

	const correct_answer = fetchCorrectAnswer(payload);
	const is_correct = correct_answer === payload.answer;

	const response: SubmitQuestionResultType = {
		is_correct,
	};

	if (!response.is_correct && correct_answer) {
		response.correct_answer = correct_answer;
	}
	return response;
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

function fetchCorrectAnswer(
	payload: SubmitAnswer
): QuestionType['answer'] | null {
	const quiz = getQuiz(payload.quiz_id);
	const question = quiz.questions.find(
		(data) => data.question === payload.question
	);
	return question?.answer ?? null;
}
