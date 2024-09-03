const mongoose = require('mongoose');

const studentSchema = mongoose.Schema (
    {
    	lastname: {
    		type: String,
    		required: [true, "Please enter a last name!"]
    	},
    	firstname: {
    		type: String,
    		required: [true, "Please enter a first name!"]
    	},
    	year: {
    		type: String,
    		enum: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'],
    		required: [true, "Please select your year!"]
    	},
    	course: {
    		type: String,
    		required: [true, "Please enter your course!"]
    	},
    	enrolled: {
    		type: Boolean,
    		required: true
    	},
    },
    {
    	timestamps: true
    }
)

module.exports = mongoose.model('Student', studentSchema);