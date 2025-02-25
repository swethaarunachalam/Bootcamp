const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

const users = [
    { id: 1, name: 'swetha', email: 'swetha@example.com' },
    { id: 2, name: 'ajay', email: 'ajay@example.com' },
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

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
