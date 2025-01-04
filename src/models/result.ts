import { SubmitAnswer } from '../validation/submitAnswer';

type ResultDataType = {
	quiz_id: string;
	question: string;
	answer: string;
};

type SessionResultDataType = Map<string, ResultDataType[]>;

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
		console.log(this.getOne(session_id));
	}
}

export default new Result();
