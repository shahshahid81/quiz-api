export type QuestionType = {
	question: string;
	options: string[];
	answer: string;
};

export type CreateQuizPayload = {
	title: string;
	questions: QuestionType[];
};

export type QuizDataType = CreateQuizPayload & {
	id: string;
};

export type GetQuizType = Omit<QuizDataType, 'questions'> & {
	questions: Omit<QuestionType, 'answer'>[];
};

export type SubmitQuestionResultType = {
	isCorrect: boolean;
	correctAnswer?: string;
};

export type GetQuizResultPayloadType = {
	sessionId: string;
	quizId: string;
};

export type GetQuizResultResponseType = {
	total: number;
	correct: number;
	result: {
		isCorrect: boolean;
		userAnswer: string;
		correctAnswer?: string;
	}[];
};
