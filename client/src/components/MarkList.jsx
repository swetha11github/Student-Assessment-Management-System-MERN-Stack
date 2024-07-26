import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Marks.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';

function MarkList() {
    const { examId } = useParams();
    const markHistory = JSON.parse(localStorage.getItem('markHistory')) || [];
    const examResults = markHistory.filter(result => result.examId === examId);

    return (
        <div className="marks-container">
            <StudentNavSidebarOpen />
            <div className='marks-body'>
                <div className='marks-courses'>
                    <span>View Marks</span>
                </div>

                <table className='marks-table'>
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Total Marks</th>
                            <th>Exam Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examResults.map((result, index) => (
                            <tr key={index}>
                                <td>{result.examName}</td>
                                <td>{result.totalMarks}</td>
                                <td>{new Date(result.startTime).toLocaleString()}</td>
                                <td>{`${Math.floor(result.duration / 60)}m ${result.duration % 60}s`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default MarkList;
