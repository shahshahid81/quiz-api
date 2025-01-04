export type ResultDataType = {
	quizId: string;
	question: string;
	answer: string;
};

export type SessionResultDataType = Map<string, ResultDataType[]>;
