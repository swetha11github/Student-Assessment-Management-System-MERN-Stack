import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardTea.css';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function AddQuestionTea() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/viewexamtea');
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const questionData = {
      questionText: formData.get('questionText'),
      option1: formData.get('option1'),
      option2: formData.get('option2'),
      option3: formData.get('option3'),
      answer: formData.get('answer'),
      marks: formData.get('marks'),
      examId: formData.get('examId'), 
    };

    try {
      const response = await fetch('http://localhost:5000/api/addquestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      navigate('/seletecourseviewquestiontea'); 
    } catch (error) {
      setError('Error adding question');
      console.error('Error adding question:', error);
    }
  };

  return (
    <div className='dashboardtea-container'>
      <TeacherNavSidebarOpen />
      <div className="addexamtea">
        <h1 id='add-question-heading'>ADD QUESTION</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Exam
            <select 
              name="examId"
              required
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              <option value="">Select Exam</option>
              {exams.map(exam => (
                <option key={exam._id} value={exam._id}>{exam.examName}</option>
              ))}
            </select>
          </label>
          <label>
            Question
            <textarea name="questionText" placeholder="Enter question text" required></textarea>
          </label>
          <label>
            Marks
            <input type="number" name="marks" placeholder="Enter marks" required />
          </label>
          <label>
            Option 1
            <input type="text" name="option1" placeholder="Option 1" required />
          </label>
          <label>
            Option 2
            <input type="text" name="option2" placeholder="Option 2" required />
          </label>
          <label>
            Option 3
            <input type="text" name="option3" placeholder="Option 3" required />
          </label>
          <label>
            Answer
            <select name="answer" required>
              <option value="">Select Answer</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
          <button type="submit">ADD</button>
        </form>
      </div>
      <QuizAppFooter />
    </div>
  );
}
