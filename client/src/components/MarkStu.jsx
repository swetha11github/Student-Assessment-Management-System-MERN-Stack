import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import '../styles/MarkStu.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';

function MarkStu() {
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
        <div className="markstu-container">
            <StudentNavSidebarOpen />
            <div className='markstu-body'>

                <div className='markstu-courses'>
                    <span>View Marks</span>
                </div>

            <table className='markstu-table'>
            <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>View Exam</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map(exam => (
                            <tr key={exam._id}>
                                <td>{exam.examName}</td>
                                <td>
                                    <Link to={`/marklist/${exam._id}/${exam.examName}`}>
                                        <button className='view-mark-btn'>
                                            <i className="fa" id='view-mark-icon'>&#xf06e;</i> 
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>
            {/* QuizAppFooter */}
            <QuizAppFooter />
        </div>
    );
}

export default MarkStu;
