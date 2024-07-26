// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
}, { collection: 'myQuestionsCollection' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;