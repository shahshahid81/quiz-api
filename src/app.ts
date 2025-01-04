import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';
import quizRouter from './routes/quiz';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
	res.send('Express + TypeScript Server');
});

app.use('/quiz', quizRouter);

export function startServer(): Server | undefined {
	try {
		return app.listen(3000, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(
			'An Error Occured while starting server: ' +
				(error?.message || error || '')
		);
		return;
	}
}

export default app;
