const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 6000;

app.use(express.json()); 

const usersFile = path.join(__dirname, 'users.json');

const readUsers = () => {
    try {
        if (!fs.existsSync(usersFile)) {
            fs.writeFileSync(usersFile, '[]');
        }
        const data = fs.readFileSync(usersFile, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to users file:', error);
    }
};

app.get('/users/:id', (req, res) => {
    const users = readUsers();
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const users = readUsers();
    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email
    };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
});

// Update user by ID
app.put('/users/:id', (req, res) => {
    const users = readUsers();
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = { ...users[userIndex], ...req.body };
    writeUsers(users);
    res.json(users[userIndex]);
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    let users = readUsers();
    const userId = parseInt(req.params.id);
    const newUsers = users.filter(u => u.id !== userId);
    
    if (users.length === newUsers.length) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    writeUsers(newUsers);
    res.status(200).json({ message: 'User deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
