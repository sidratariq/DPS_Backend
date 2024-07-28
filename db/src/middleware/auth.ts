import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];

	if (token !== 'Password123') {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	next();
};

export default authMiddleware;
