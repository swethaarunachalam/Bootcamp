const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;

app.use(express.json());
const validateStudentInput = [
    body('rollNo')
        .isInt().withMessage('Roll number must be an integer')
        .notEmpty().withMessage('Roll number is required'),
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required'),
    body('age')
        .isInt({ min: 18, max: 60 }).withMessage('Age must be between 18 and 60'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

app.post('/students', validateStudentInput, (req, res) => {
    const { rollNo, name, email, age } = req.body;
    res.status(201).json({ message: 'Student added successfully', data: { rollNo, name, email, age } });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

