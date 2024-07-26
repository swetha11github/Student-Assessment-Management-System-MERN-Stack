import React from 'react';
import { Link } from 'react-router-dom';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';
import QuizAppFooter from './QuizAppFooter';
import '../styles/DashboardTea.css';

function QuestionTea() {
    return (
        <div className="examtea-container">
            <TeacherNavSidebarOpen />
            <div className='dashboardstu' id='exam-tea'>
                <div className='dashboard-exam'>
                    <Link to='/addquestiontea'>
                        <p>Add Question</p>
                        <i className='fas' id='add-exam-icon'>&#xf067;</i>
                    </Link>
                </div>
                <div className='dashboard-question'>
                    <Link to="/seletecourseviewquestiontea">
                        <p>View Questions</p>
                        <i className="fa" id='view-exam-icon'>&#xf06e;</i>
                    </Link>
                </div>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default QuestionTea;
