import { KeyValue } from '../types/common';
import { ErrorEnum } from '../types/enums';
import { CreateQuizPayload } from '../types/quiz';

type QuizData = {
	title: string;
	questions: {
		question: KeyValue<string, string>;
		options: KeyValue<string, string>[];
		answer: string;
	}[];
};

class Quiz {
	private quizMap: Map<string, QuizData>;

	constructor() {
		this.quizMap = new Map();
	}

	getQuiz() {
		return this.quizMap;
	}

	add(payload: CreateQuizPayload) {
		const quizMap = this.getQuiz();
		if (quizMap.has(payload.title)) {
			throw {
				type: ErrorEnum.UNPROCESSABLE_ENTITY,
				message: 'Quiz Already Exists',
			};
		}
		quizMap.set(payload.title, payload);
	}
}

export default new Quiz();
