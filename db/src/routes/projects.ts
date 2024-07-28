import express from 'express';
import db from '../services/db.service';

const router = express.Router();

interface RunResult {
	changes: number;
}
// Get all projects
// Get all projects
router.get('/', async (req, res) => {
	try {
		const rows = await db.query('SELECT * FROM projects');
		res.json(rows);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Create a project
router.get('/', async (req, res) => {
	try {
		const rows = await db.query('SELECT * FROM projects');
		res.json(rows);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Update a project

router.put('/:id', async (req, res) => {
	const { name, description } = req.body;
	try {
		const result = (await db.run(
			'UPDATE projects SET name = ?, description = ? WHERE id = ?',
			{ name, description, id: req.params.id },
		)) as RunResult;
		res.json({ message: 'Project updated', changes: result.changes });
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Delete a project
router.delete('/:id', async (req, res) => {
	try {
		const result = (await db.run('DELETE FROM projects WHERE id = ?', {
			id: req.params.id,
		})) as RunResult;
		res.json({ message: 'Project deleted', changes: result.changes });
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

export default router;
