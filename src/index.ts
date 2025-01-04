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

// Added is_test flag to avoid parallel jest issue. Ideally, using different env file for development and test will not cause this issue but env file is not used for ease of testing
export async function startServer(
	is_test = false
): Promise<Server | undefined> {
	try {
		const portBetween5000and6500 = Math.floor(Math.random() * 60000) + 5000;
		const server = app.listen(is_test ? portBetween5000and6500 : port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
		return server;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.log(
			'An Error Occured while starting server: ' +
				(error?.message || error || '')
		);
		return;
	}
}

startServer();

export default app;
