import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ExamStu.css';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';

export default function ViewQuestionTea() {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);

  const query = new URLSearchParams(location.search);
  const examId = query.get('examId');

  const fetchQuestions = useCallback(async () => {
    if (!examId) return; 
    try {
      const response = await fetch(`http://localhost:5000/api/viewquestions?examId=${examId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, [examId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/viewquestions/${questionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete question');
      }
      setQuestions(questions.filter(question => question._id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="examstu-container">
      <TeacherNavSidebarOpen />
      <div className='examstu-body'>
        <div className='examstu-courses'>
          <span>Questions</span>
        </div>
        <table className='examstu-table'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Marks</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr key={question._id}>
                <td>{question.questionText}</td>
                <td>{question.marks}</td>
                <td>
                  <Link to={`/updatequestiontea/${question._id}`}>
                    <button className='delete-exam-btn'>
                      <i className="fa" id='edit-exam-icon'>&#xf044;</i>
                    </button>
                  </Link>
                </td>
                <td>
                  <button className='delete-exam-btn' onClick={() => handleDelete(question._id)}>
                    <i className="fa" id='trash-exam-icon'>&#xf014;</i>
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
