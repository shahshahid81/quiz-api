import { CreateQuiz } from '../validation/createQuiz';

export function createQuiz({ title, questions }: CreateQuiz) {
	console.dir({ title, questions }, { depth: null });
	return { title, questions };
}
