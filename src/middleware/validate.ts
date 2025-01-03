import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export const validate = (schema: ZodType) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		let dataToValidate = req.body;
		if (req.method === 'GET') {
			dataToValidate = { ...req.query, ...req.params };
		}

		const result = await schema.safeParse(dataToValidate);

		if (!result.success) {
			res.status(400).json({
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				errors: result.error.errors.map((error: any) => ({
					message: error.message,
					path: error.path.join('.'),
				})),
			});
			return;
		}

		// TODO: check how to handle query and params data
		req.body = result.data;

		next();
	};
};
