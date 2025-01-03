export type CreateQuizPayload = {
	title: string;
	questions: {
		question: string;
		options: string[];
		answer: string;
	}[];
};
