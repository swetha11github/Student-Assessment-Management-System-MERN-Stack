import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ExamStu.css'
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function ViewExamTea() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/viewexamtea');
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleDelete = async (examId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/viewexamtea/${examId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExams(exams.filter(exam => exam._id !== examId));
      } else {
        console.error('Failed to delete exam');
      }
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <div className="examstu-container">
      <TeacherNavSidebarOpen />
      <div className='examstu-body'>
        <div className='examstu-courses'>
          <span>Exams</span>
        </div>
        <table className='examstu-table'>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Total Questions</th>
              <th>Total Marks</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {exams.map(exam => (
              <tr key={exam._id}>
                <td>{exam.examName}</td>
                <td>{exam.totalQuestions}</td>
                <td>{exam.totalMarks}</td>
                <td>
                <Link to={`/updateexamtea/${exam._id}`}>
                    <button className='delete-exam-btn'>
                    <i className="fa" id='edit-exam-icon'>&#xf044;</i>
                    </button>
                </Link>
                </td>
                <td>
                  <button className='delete-exam-btn' onClick={() => handleDelete(exam._id)}>
                  <i className="fa" id='delete-exam-icon'>&#xf014;</i>
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
