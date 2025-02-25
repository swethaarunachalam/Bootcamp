const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());

const usersFile = path.join(__dirname, 'users.json');

const readUsers = () => {
    try {
        if (!fs.existsSync(usersFile)) {
            fs.writeFileSync(usersFile, '[]', 'utf-8');
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
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing to users file:', error);
    }
};

// Email validation function
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Create new user (POST)
app.post('/users', (req, res) => {
    try {
        let { name, email } = req.body;

        // Trim whitespace
        name = name ? name.trim() : '';
        email = email ? email.trim() : '';

        // Validate name
        if (!name || typeof name !== 'string' || name.length < 3) {
            return res.status(400).json({ error: 'Invalid name: Must be at least 3 characters long.' });
        }

        // Validate email
        if (!email || typeof email !== 'string' || !isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email: A valid email address is required.' });
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
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user by ID (GET)
app.get('/users/:id', (req, res) => {
    try {
        const users = readUsers();
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user by ID (PUT)
app.put('/users/:id', (req, res) => {
    try {
        const users = readUsers();
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        let { name, email } = req.body;
        name = name ? name.trim() : '';
        email = email ? email.trim() : '';

        if (name && (typeof name !== 'string' || name.length < 3)) {
            return res.status(400).json({ error: 'Invalid name: Must be at least 3 characters long.' });
        }

        if (email && (typeof email !== 'string' || !isValidEmail(email))) {
            return res.status(400).json({ error: 'Invalid email: A valid email address is required.' });
        }

        users[userIndex] = { ...users[userIndex], ...req.body };
        writeUsers(users);
        res.json(users[userIndex]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete user by ID (DELETE)
app.delete('/users/:id', (req, res) => {
    try {
        let users = readUsers();
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const newUsers = users.filter(u => u.id !== userId);

        if (users.length === newUsers.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        writeUsers(newUsers);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
