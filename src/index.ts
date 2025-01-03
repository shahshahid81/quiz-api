// Important to load config here at the top so that other imports below will recieve the env values in process.env key
import { config } from './config/env';
import bodyParser from 'body-parser';
import express from 'express';
import { Server } from 'http';
import quizRouter from './routes/quiz';

const app = express();
const port = config.PORT;

app.use(bodyParser.json());

app.get('/', (_req, res) => {
	res.send('Express + TypeScript Server');
});

app.use('/quiz', quizRouter);

export async function startServer(): Promise<Server | undefined> {
	try {
		const server = app.listen(port, () => {
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
