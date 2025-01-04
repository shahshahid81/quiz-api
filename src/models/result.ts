import { ResultDataType, SessionResultDataType } from '../types/result';
import { SubmitAnswer } from '../validation/submitAnswer';

class Result {
	private resultMap: SessionResultDataType;

	constructor() {
		this.resultMap = new Map();
	}

	getAll(): SessionResultDataType {
		return this.resultMap;
	}

	getOne(id: string): ResultDataType[] | undefined {
		const resultMap = this.getAll();
		return resultMap.get(id);
	}

	insert({ question, quizId, sessionId, answer }: SubmitAnswer): void {
		const resultMap = this.getAll();
		const result = this.getOne(sessionId) ?? [];
		result.push({ quizId, question, answer });
		resultMap.set(sessionId, result);
	}
}

export default new Result();
