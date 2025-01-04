export type CreateQuizPayload = {
	title: string;
	questions: {
		question: string;
		options: string[];
		answer: string;
	}[];
};

export type QuizDataType = {
	id: string;
	title: string;
	questions: {
		question: string;
		options: string[];
		answer: string;
	}[];
};
