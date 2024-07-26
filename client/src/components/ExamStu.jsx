import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ExamStu.css';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';
import QuizAppFooter from './QuizAppFooter';

function ExamStu() {
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

    return (
        <div className="examstu-container">
            <StudentNavSidebarOpen />
            <div className='examstu-body'>
                <div className='examstu-courses'>
                    <span>Courses</span>
                </div>
                <table className='examstu-table'>
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Take Exam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map(exam => (
                            <tr key={exam._id}>
                                <td>{exam.examName}</td>
                                <td>
                                    <Link to={`/examrules/${exam._id}/${exam.examName}`}>
                                        <button className='take-exam-btn'>
                                            <i className="fa" id='take-exam-icon'>&#xf056;</i> 
                                        </button>
                                    </Link>
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

export default ExamStu;
