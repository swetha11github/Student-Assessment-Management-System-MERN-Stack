import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function UpdateExamTea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    examName: '',
    totalQuestions: '',
    totalMarks: ''
  });

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/exams/${id}`);
        const data = await response.json();
        setExam(data);
      } catch (error) {
        console.error('Error fetching exam:', error);
      }
    };

    fetchExam();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam(prevExam => ({
      ...prevExam,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/updateexamtea/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exam)
      });

      if (response.ok) {
        navigate('/viewexamtea');
      } else {
        console.error('Failed to update exam');
      }
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  return (
    <div className='dashboardtea-container'>
      <TeacherNavSidebarOpen />
      <div className="addexamtea">
        <h1>Update Exam</h1>
        <form onSubmit={handleSubmit}>
          <label>Exam name
            <input type="text" name="examName" value={exam.examName} onChange={handleChange} required />
          </label>
          <label>Total Question
            <input type="number" name="totalQuestions" value={exam.totalQuestions} onChange={handleChange} required />
          </label>
          <label>Total Marks
            <input type="number" name="totalMarks" value={exam.totalMarks} onChange={handleChange} required />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
      <QuizAppFooter />
    </div>
  );
}
