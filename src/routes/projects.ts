import express from 'express';
import db from '../services/db.service';

const router = express.Router();

interface RunResult {
	changes: number;
}

interface Project {
	id: string;
	name: string;
	description: string;
}
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

// Get a single project by ID
router.get('/:id', async (req, res) => {
	try {
		const rows = await db.query<Project[]>(
			'SELECT * FROM projects WHERE id = ?',
			[req.params.id],
		);
		if (rows.length === 0) {
			res.status(404).json({ error: 'Project not found' });
		} else {
			res.json(rows[0]);
		}
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Create a project
router.post('/', async (req, res) => {
	const { id, name, description } = req.body;
	try {
		await db.run(
			'INSERT INTO projects (id, name, description) VALUES (?, ?, ?)',
			[id, name, description],
		);
		res.status(201).json({ id, name, description });
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
			[name, description, req.params.id],
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
		const result = (await db.run('DELETE FROM projects WHERE id = ?', [
			req.params.id,
		])) as RunResult;
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
