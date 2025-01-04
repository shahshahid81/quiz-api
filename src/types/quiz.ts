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
