import { CreateQuizPayload, QuizDataType } from '../types/quiz';
import { v4 as uuidv4 } from 'uuid';

type QuizMapType = Map<string, QuizDataType>;

class Quiz {
	private quizMap: QuizMapType;

	constructor() {
		this.quizMap = new Map();
	}

	getAll(): QuizMapType {
		return this.quizMap;
	}

	insert(payload: CreateQuizPayload): QuizDataType {
		const quizMap = this.getAll();
		const quiz = { ...payload, id: uuidv4() };
		quizMap.set(quiz.id, quiz);
		return quiz;
	}

	getOne(id: string): QuizDataType | undefined {
		const quizMap = this.getAll();
		return quizMap.get(id);
	}
}

export default new Quiz();
