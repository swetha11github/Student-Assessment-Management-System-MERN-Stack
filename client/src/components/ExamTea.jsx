import React from 'react';
import { Link } from 'react-router-dom';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';
import '../styles/DashboardTea.css';

function ExamTea() {
    return (
        <div className="examtea-container">
            <TeacherNavSidebarOpen />
            <div className='dashboardstu' id='exam-tea'>
                <div className='dashboard-exam'>
                    <Link to='/addexamtea'>
                        <p>Add Exam</p>
                        <i className='fas' id='add-exam-icon'>&#xf067;</i>
                    </Link>
                </div>
                <div className='dashboard-question'>
                    <Link to="/viewexamtea">
                        <p>View Exams</p>
                        <i className="fa" id='view-exam-icon'>&#xf06e;</i>
                    </Link>
                </div>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default ExamTea;
