import Quiz from '../models/quiz';
import { CreateQuiz } from '../validation/createQuiz';

export function createQuiz({ title, questions }: CreateQuiz) {
	const quiz = { title, questions };
	return Quiz.insert(quiz);
}

export function getQuiz(id: string) {
	return Quiz.getOne(id);
}
