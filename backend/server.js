const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db-config');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// Ruta para guardar interacciones
app.post('/interactions', (req, res) => {
    const { user, action, timestamp } = req.body;
    db.run(
        'INSERT INTO interactions (user, action, timestamp) VALUES (?, ?, ?)',
        [user, action, timestamp],
        (err) => {
            if (err) {
                res.status(500).send({ error: 'Failed to save interaction' });
            } else {
                res.status(200).send({ message: 'Interaction saved successfully' });
            }
        }
    );
});


app.post('/analytics', (req, res) => {
    const { page, action, timestamp, user_agent } = req.body;

    db.run(
        'INSERT INTO analytics (page, action, timestamp, user_agent) VALUES (?, ?, ?, ?)',
        [page, action, timestamp, user_agent],
        (err) => {
            if (err) {
                res.status(500).send({ error: 'Failed to save analytics' });
            } else {
                res.status(200).send({ message: 'Analytics saved successfully' });
            }
        }
    );
});

app.get('/analytics/view', (req, res) => {
    db.all('SELECT * FROM analytics', [], (err, rows) => {
        if (err) {
            res.status(500).send({ error: 'Error retrieving analytics' });
        } else {
            res.status(200).json(rows);
        }
    });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send('El servidor está funcionando correctamente.');
});


const path = require('path');

// Configuración para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta principal para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.min.html'));
});

// Endpoint en el servidor que devuelva las métricas necesarias:
app.get('/analytics/dashboard', (req, res) => {
    const analyticsData = [
        { page: '/home', visits: 120 },
        { page: '/about', visits: 45 },
        { page: '/contact', visits: 32 },
    ];
    
    db.all(query, [], (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});




