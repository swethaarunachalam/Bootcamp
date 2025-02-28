const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model')
const app = express();

app.use(express.json());

app.get('/students',async (req,res)=>{
    try{
        const students1 = await Student.find();
        res.json(students1);
    }catch(error){
        res.json({message:"error"})
    }
})

app.post('/add', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student)
    } catch (error) {
        res.status(500).send("Error");
    }
});


// DELETE student
app.delete('/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid ID format" });
    }
});
app.listen(3000,(req,res)=>{
    console.log('server is running on port 3000');
})
mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha")
.then(()=>{
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})