// Require the mongoose
const mongoose = require('mongoose');

// Schema is used to which type of data only allow in the form field
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Form fields data are stored into mongoDB database name teacher
const Teacher = mongoose.model('Teacher', teacherSchema, 'myTeachersCollection'); // teacher is the Database name in mongoDB compass

// Exports the module
module.exports = Teacher;
