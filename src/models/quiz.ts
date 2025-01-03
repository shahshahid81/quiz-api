import { ErrorEnum } from '../types/enums';
import { CreateQuizPayload } from '../types/quiz';
import { v4 as uuidv4 } from 'uuid';

type QuizData = {
	id: string;
	title: string;
	questions: {
		question: string;
		options: string[];
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

	insert(payload: CreateQuizPayload) {
		const quizMap = this.getQuiz();
		if ([...quizMap.values()].map(value => value.title).includes(payload.title)) {
			throw {
				type: ErrorEnum.UNPROCESSABLE_ENTITY,
				message: 'Quiz Already Exists',
			};
		}
		const quiz = { ...payload, id: uuidv4() };
		quizMap.set(quiz.id, quiz);
		return quiz;
	}

	getOne(id: string) {
		const quizMap = this.getQuiz();
		if (!quizMap.has(id)) {
			throw {
				type: ErrorEnum.NOT_FOUND,
				message: 'Quiz Not Found',
			};
		}
		return quizMap.get(id);
	}
}

export default new Quiz();
