import express, { NextFunction, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { CreateQuiz, createQuizSchema } from '../validation/createQuiz';
import { createQuiz, getQuiz } from '../services/quiz';
import { ErrorEnum } from '../types/enums';

const router = express.Router();

const routeHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fn: (...args: any[]) => any
) => {
	try {
		fn(req, res, next);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		let status = 500;
		let message = error?.message || 'An error occured';

		if (error?.type === ErrorEnum.UNPROCESSABLE_ENTITY) {
			status = 422;
			message = error?.message || 'Unprocessable Entity';
		} else if (error?.type === ErrorEnum.NOT_FOUND) {
			status = 404;
			message = error?.message || 'Data not found';
		}
		res.status(status).json({
			success: false,
			message,
		});
	}
};

router.post(
	'/',
	validate(createQuizSchema),
	(req: Request, res: Response, next: NextFunction): void => {
		routeHandler(req, res, next, (req, res) => {
			const { title, questions } = req.body as CreateQuiz;
			const quiz = createQuiz({ title, questions });
			res.status(201).json({ success: true, quiz });
		});
	}
);

router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
	routeHandler(req, res, next, (req, res) => {
		const { id } = req.params;
		const quiz = getQuiz(id);
		res.status(200).json({ success: true, quiz });
	});
});

export default router;
