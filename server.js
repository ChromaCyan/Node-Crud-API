const express = require('express');
const mongoose = require('mongoose');
const app = express()


//API routes

//Read
app.get('/', (req, res) =>{
	res.send("Hello API")
})

app.get('/blog', (req, res) =>{
	res.send("Hello APIsdsdsds")
})

//Create

//Update

//Delete

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

