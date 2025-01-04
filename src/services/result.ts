import Result from '../models/result';
import { SubmitAnswer } from '../validation/submitAnswer';

export function isQuestionAlreadySubmitted({
	quiz_id,
	question,
	session_id,
}: SubmitAnswer): boolean {
	const sessionResults = Result.getOne(session_id);

	if (sessionResults) {
		const submittedQuizQuestions = sessionResults
			.filter((sessionResults) => sessionResults.quiz_id === quiz_id)
			.map((sessionResult) => sessionResult.question);
		return submittedQuizQuestions.includes(question);
	}

	return false;
}
