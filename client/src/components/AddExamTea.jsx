import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardTea.css';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function AddExamTea() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:5000/api/addexamtea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examName: formData.get('examName'),
          totalQuestions: parseInt(formData.get('totalQuestions')),
          totalMarks: parseInt(formData.get('totalMarks')),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Exam added:', data);
        navigate('/viewexamtea'); 
      } else {
        console.error('Failed to add exam');
      }
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  return (
    <div className='dashboardtea-container'>
      <TeacherNavSidebarOpen />
      <div className="addexamtea">
        <h1>ADD EXAM</h1>
        <form onSubmit={handleSubmit}>
          <label>Exam Name
            <input type="text" name="examName" placeholder="Enter Exam Name" required />
          </label>
          <label>Total Questions
            <input type="number" name="totalQuestions" placeholder="Enter Total Questions" required />
          </label>
          <label>Total Marks
            <input type="number" name="totalMarks" placeholder="Enter Total Marks" required />
          </label>
          <button type="submit">ADD</button>
        </form>
      </div>
      <QuizAppFooter />
    </div>
  );
}
