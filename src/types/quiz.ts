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
	is_correct: boolean;
	correct_answer?: string;
};

export type GetQuizResultPayloadType = {
	session_id: string;
	quiz_id: string;
};

export type GetQuizResultResponseType = {
	total: number;
	correct: number;
	result: {
		is_correct: boolean;
		user_answer: string;
		correct_answer?: string;
	}[];
};
