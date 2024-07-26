// src/components/StudentDashboard.js
import React, { useContext } from 'react';
import { StudentContext } from '../Context/StudentContext';
import '../styles/StudentDashboard.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarClose from './StudentNavSidebarClose';

function StudentDashboard() {
    const { student } = useContext(StudentContext);

    return (
        <div className="studentdashboard-container">
            <StudentNavSidebarClose />
            <div className='hello-student'>
                <h1>Hello, {student ? student.name : 'Student'}</h1>
                <p>Learn something new every day!</p>
            </div>
            <QuizAppFooter />
        </div>
    );
}

// Export the StudentDashboard
export default StudentDashboard;