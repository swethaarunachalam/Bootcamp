const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/students",async(req,res)=>{
    const students = await Student.find()
    res.json(students)
})  

app.put("/students/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const students = await Student.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(students)
    }catch(error){
        res.send(error);
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
