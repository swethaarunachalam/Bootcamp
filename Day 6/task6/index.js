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

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

app.post('/users', (req, res) => {
    let { name, email } = req.body;

    name = name ? name.trim() : '';
    email = email ? email.trim() : '';

    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ error: 'Invalid name: Name is required and must be at least 3 characters long.' });
    }

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
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

