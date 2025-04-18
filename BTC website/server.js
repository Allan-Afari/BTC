require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'client_data'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Client Management System'
    });
});

// Client data routes
app.get('/api/clients', (req, res) => {
    db.query('SELECT * FROM `Client data`', (err, results) => {
        if (err) {
            console.error('Error fetching clients:', err);
            res.status(500).json({ error: 'Error fetching clients' });
            return;
        }
        res.json(results);
    });
});

// Get specific client details
app.get('/api/clients/:id', (req, res) => {
    const clientId = req.params.id;
    db.query('SELECT * FROM `Client data` WHERE client_id = ?', [clientId], (err, results) => {
        if (err) {
            console.error('Error fetching client:', err);
            res.status(500).json({ error: 'Error fetching client' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        res.json(results[0]);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 