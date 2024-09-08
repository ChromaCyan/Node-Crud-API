const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/studentModel');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// API routes
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: `Student not found with ID ${id}` });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/students', async (req, res) => {
    const { lastname, firstname, course, year, enrolled } = req.body;
    try {
        const isEnrolled = enrolled === "true" || enrolled === true;
        const newStudent = new Student({
            lastname,
            firstname,
            course,
            year,
            enrolled: isEnrolled
        });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { lastname, firstname, course, year, enrolled } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { lastname, firstname, course, year, enrolled },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: `Cannot find student with ID ${id}` });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: `Cannot find student with ID ${id}` });
        }
        res.status(204).end(); // No content response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error: ", error);
    });
