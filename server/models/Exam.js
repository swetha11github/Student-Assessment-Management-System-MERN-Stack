const mongoose = require('mongoose');

// Define exam schema
const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'myExamsCollection' }); 


const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
