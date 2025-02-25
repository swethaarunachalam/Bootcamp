
const express = require('express');
const app = express();
const port = 1000;
const users = [
    { id: 1, name: 'swetha', email: 'swetha@example.com' },
    { id: 2, name: 'arunachalam', email: 'arunachalam@example.com' },
    { id: 3, name: 'padma', email: 'padma@example.com' }
];

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

