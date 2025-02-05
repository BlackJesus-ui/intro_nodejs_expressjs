const express = require('express');
const app = express();
const port = 3000;

// Middleware to serve static files and parse JSON bodies
app.use(express.static('public'));
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const items = ['saging', 'manga', 'papaya'];

app.get('/items', (req, res) => {
    res.json(items);
});

// POST /items route
// app.post('/items', (req, res) => {
//     const newItem = req.body.item;
//     if (newItem) {
//         items.push(newItem);
//         res.status(201).json(items);
//     } else {
//         res.status(400).send('Item is required');
//     }
// });

app.post('/items', (req, res) => {
    const newItem = req.body.item
    items.push(newItem)
    res.json(items)
})

// Example of a route that might cause an error
app.get('/about', (req, res) => {
    throw new Error('This is a simulated error');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});