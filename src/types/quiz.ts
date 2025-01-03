import { KeyValue } from './common';

export type CreateQuizPayload = {
	title: string;
	questions: {
		question: KeyValue<string, string>;
		options: KeyValue<string, string>[];
		answer: string;
	}[];
};
