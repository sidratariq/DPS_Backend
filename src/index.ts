import express, { Express } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects';
import reportRoutes from './routes/reports';
import authMiddleware from './middleware/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);

app.use('/api/projects', projectRoutes);
app.use('/api/reports', reportRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
