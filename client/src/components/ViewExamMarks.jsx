import React from 'react';
import '../styles/Marks.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';

function ViewExamMarks() {
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>React.js</td>
                            <td>5</td>
                            <td>Date</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default ViewExamMarks;
