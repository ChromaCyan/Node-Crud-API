const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/studentModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//API routes

//Read All Student API
app.get('/students', async(req, res) =>{
	try{
		const student = await Student.find(req.body)
		res.status(200).json(student);
	}catch(error){
		console.log(error.message)
		res.status(500).json({message: error.message})
	}
})

//Read one Student API
app.get('/students/:id', async(req, res) =>{
	try{
		const {id} = req.params
		const student = await Student.findById(id)
		res.status(200).json(student);
	}catch(error){
		console.log(error.message)
		res.status(500).json({message: error.message})
	}
})

//Create Student API
app.post('/students', async(req, res) =>{
	try{
		const student = await Student.create(req.body)
		res.status(200).json(student);
	}catch(error){
		console.log(error.message)
		res.status(500).json({message: error.message})
	}
})

//Update by ID Student API
app.put('/students/:id', async(req, res) => {
	try{
		const {id} = req.params
		const student = await Student.findByIdAndUpdate(id, req.body)
		if(!student){
			return res.status(404,{message: `cannot find student by ID ${id}`})
		}
		const updatedStudent = await Student.findById(id);
		res.status(200).json({message: "Data Successfully updated!", updatedStudent});
	}catch(error){
		console.log(error.message)
		res.status(500).json({message: error.message})
	}
})

//Delete by ID Student API
app.delete('/students/:id', async(req, res) => {
	try{
		const {id} = req.params
		const student = await Student.findByIdAndDelete(id, req.body)
		if(!student){
			return res.status(404,{message: `cannot find student by ID ${id}`})
		}
		res.status(200).json({message: "Data Successfully deleted"});
	}catch(error){
		console.log(error.message)
		res.status(500).json({message: error.message})
	}
})

//Database Connection
mongoose.set("strictQuery", false);
mongoose.
connect('mongodb+srv://admin:pass123@chromacyapi.1fqug.mongodb.net/Node-API?retryWrites=true&w=majority&appName=ChromaCyAPI')
.then(() => {
	//App Start
	console.log("Connected to MongoDB")
    app.listen(3000, () => {
	    console.log("Node API app is running on port 3000")
    });
})
.catch((error) => {
	console.log(error)
})

