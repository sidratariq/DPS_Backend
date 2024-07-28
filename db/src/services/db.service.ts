import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('./db/db.sqlite3');

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Error opening database', err);
	} else {
		console.log('Database connected');
	}
});

function query(
	sql: string,
	params?: { [key: string]: string | number | undefined },
) {
	return new Promise((resolve, reject) => {
		db.all(sql, params, (err, rows) => {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}

function run(
	sql: string,
	params?: { [key: string]: string | number | undefined },
) {
	return new Promise((resolve, reject) => {
		db.run(sql, params, function (err) {
			if (err) reject(err);
			else resolve(this);
		});
	});
}

export default { db, query, run };
