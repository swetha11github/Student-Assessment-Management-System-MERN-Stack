import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExamStu.css';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function SelectCourseViewQuestionTea() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

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

  const handleViewQuestions = (examId) => {
    navigate(`/viewquestiontea?examId=${examId}`);
  };

  return (
    <div className="examstu-container">
      <TeacherNavSidebarOpen />
      <div className='examstu-body'>
        <div className='examstu-courses'>
          <span>Select Course To View Questions</span>
        </div>
        <table className='examstu-table'>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Total Questions</th>
              <th>Total Marks</th>
              <th>View Questions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map(exam => (
              <tr key={exam._id}>
                <td>{exam.examName}</td>
                <td>{exam.totalQuestions}</td>
                <td>{exam.totalMarks}</td>
                <td>
                  <button className='delete-exam-btn' onClick={() => handleViewQuestions(exam._id)}>
                    <i className="fa" id='view-mark-icon'>&#xf06e;</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <QuizAppFooter />
    </div>
  );
}
