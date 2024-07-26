import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function UpdateQuestionTea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState({
    examId: '',
    questionText: '',
    marks: '',
    options: ['', '', ''],
    answer: '',
  });
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/questions/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question');
        }
        const question = await response.json();
        setQuestionData({
          examId: question.examId,
          questionText: question.questionText,
          marks: question.marks,
          options: question.options,
          answer: question.answer,
        });
      } catch (error) {
        console.error('Error fetching question:', error.message);
      }
    };

    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/viewexamtea');
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const examsData = await response.json();
        setExams(examsData);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchQuestion();
    fetchExams();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData((prevData) => ({
      ...prevData,
      options: newOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/updatequestiontea/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        navigate(`/viewquestiontea?examId=${questionData.examId}`);
      } else {
        const errorData = await response.json();
        console.error('Failed to update question:', errorData);
      }
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className='dashboardtea-container'>
      <TeacherNavSidebarOpen />
      <div className="addexamtea">
        <h1>Update Question</h1>
        <form onSubmit={handleSubmit}>
          <label>Exam
            <select
              name="examId"
              value={questionData.examId}
              onChange={handleChange}
              required
            >
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>{exam.examName}</option>
              ))}
            </select>
          </label>
          <label>Question
            <textarea
              name="questionText"
              value={questionData.questionText}
              onChange={handleChange}
              placeholder="Enter question text"
              required
            ></textarea>
          </label>
          <label>Marks
            <input
              type="number"
              name="marks"
              value={questionData.marks}
              onChange={handleChange}
              placeholder="Enter marks"
              required
            />
          </label>
          <label>Option 1
            <input
              type="text"
              value={questionData.options[0]}
              onChange={(e) => handleOptionChange(0, e.target.value)}
              placeholder="Option 1"
              required
            />
          </label>
          <label>Option 2
            <input
              type="text"
              value={questionData.options[1]}
              onChange={(e) => handleOptionChange(1, e.target.value)}
              placeholder="Option 2"
              required
            />
          </label>
          <label>Option 3
            <input
              type="text"
              value={questionData.options[2]}
              onChange={(e) => handleOptionChange(2, e.target.value)}
              placeholder="Option 3"
              required
            />
          </label>
          <label>Answer
            <select
              name="answer"
              value={questionData.answer}
              onChange={handleChange}
              required
            >
              <option value="">Select Answer</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
      <QuizAppFooter />
    </div>
  );
}
