import express from 'express';
import db from '../services/db.service';

const router = express.Router();

interface RunResult {
	changes: number;
}

// Get all reports for a project
router.get('/project/:projectId', async (req, res) => {
	try {
		const rows = await db.query(
			'SELECT * FROM reports WHERE projectid = ?',
			[req.params.projectId], // Changed this line
		);
		res.json(rows);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Create a report/
// Create a report
router.post('/', async (req, res) => {
	const { id, text, projectid } = req.body;
	try {
		await db.run(
			'INSERT INTO reports (id, text, projectid) VALUES (?, ?, ?)',
			[id, text, projectid],
		);
		res.status(201).json({ id, text, projectid });
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});
// Update a report
router.put('/:id', async (req, res) => {
	const { text } = req.body;
	try {
		const result = (await db.run(
			'UPDATE reports SET text = ? WHERE id = ?',
			[text, req.params.id],
		)) as RunResult;
		res.json({ message: 'Report updated', changes: result.changes });
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Delete a report
router.delete('/:id', async (req, res) => {
	try {
		const result = (await db.run('DELETE FROM reports WHERE id = ?', [
			req.params.id,
		])) as RunResult;
		res.json({ message: 'Report deleted', changes: result.changes });
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

// Special API Endpoint: Get reports with words appearing at least 3 times
// Special API Endpoint: Get reports with words appearing at least 3 times
router.get('/frequent-words', async (req, res) => {
	try {
		const rows = await db.query(`
            SELECT DISTINCT r.* FROM reports r
            WHERE r.id IN (
                SELECT report_id
                FROM (
                    SELECT reports.id as report_id, value as word
                    FROM reports, json_each('["' || replace(lower(reports.text), ' ', '","') || '"]')
                    GROUP BY reports.id, value
                    HAVING COUNT(*) >= 3
                )
            )
        `);

		res.json(rows);
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
});

export default router;
