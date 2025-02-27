import Result from '../models/result';
import { ErrorEnum } from '../types/enums';
import { ResultDataType } from '../types/result';
import { SubmitAnswer } from '../validation/submitAnswer';

export function isQuestionAlreadySubmitted({
	quizId,
	question,
	sessionId,
}: SubmitAnswer): boolean {
	const sessionResults = Result.getOne(sessionId);

	if (sessionResults) {
		const submittedQuizQuestions = sessionResults
			.filter((sessionResults) => sessionResults.quizId === quizId)
			.map((sessionResult) => sessionResult.question);
		return submittedQuizQuestions.includes(question);
	}

	return false;
}

export function getResultData(id: string): ResultDataType[] {
	const resultData = Result.getOne(id);
	if (!resultData) {
		throw {
			type: ErrorEnum.NOT_FOUND,
			message: 'Quiz Session Not Found',
		};
	}
	return resultData;
}
