import Quiz from '../models/quiz';
import { CreateQuiz } from '../validation/createQuiz';

export function createQuiz({ title, questions }: CreateQuiz) {
	const quiz = { title, questions };
	Quiz.add(quiz);
	return quiz;
}
