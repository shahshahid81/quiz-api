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

	insert({ question, quiz_id, session_id, answer }: SubmitAnswer): void {
		const resultMap = this.getAll();
		const result = this.getOne(session_id) ?? [];
		result.push({ quiz_id, question, answer });
		resultMap.set(session_id, result);
	}
}

export default new Result();
