export type ResultDataType = {
	quiz_id: string;
	question: string;
	answer: string;
};

export type SessionResultDataType = Map<string, ResultDataType[]>;
