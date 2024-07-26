// Require the mongoose
const mongoose = require('mongoose');

// Schema is used to which type of data only allow in the form field
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Form fields data are stored into mongoDB database name student 
const Student = mongoose.model('Student', studentSchema, 'myStudentsCollection'); // student is the Database name in mongoDB compass

// Exports the module
module.exports = Student; 
