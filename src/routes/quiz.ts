import express, { Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { CreateQuiz, createQuizSchema } from '../validation/createQuiz';
import { createQuiz } from '../services/quiz';
import { ErrorEnum } from '../types/enums';

const router = express.Router();

router.post(
	'/',
	validate(createQuizSchema),
	(req: Request, res: Response): void => {
		const { title, questions } = req.body as CreateQuiz;
		try {
			createQuiz({ title, questions });
			res.status(201).json({ success: true });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error?.type === ErrorEnum.UNPROCESSABLE_ENTITY) {
				res.status(422).json({
					success: false,
					message: error?.message || 'Unprocessable Entity',
				});
				return;
			}
			res.status(500).json({
				success: false,
				message: error?.message || 'An error occured',
			});
		}
	}
);

export default router;
