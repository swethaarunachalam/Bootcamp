const express = require('express');
const app = express();
const PORT = 4000;

const users = [
    { id: 1, name: 'Arun' },
    { id: 2, name: 'Padma' },
    { id: 3, name: 'Ajay' }
];

app.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'Arunachalam' },
        { id: 2, name: 'Ajay' },
        { id: 3, name: 'Padma' }
    ]);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
