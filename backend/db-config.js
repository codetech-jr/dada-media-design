const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            page TEXT,
            action TEXT,
            timestamp TEXT,
            user_agent TEXT
        )
    `);
});


module.exports = db;
