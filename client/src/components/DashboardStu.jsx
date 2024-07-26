import React, { useState, useEffect }  from 'react';
import '../styles/DashboardStu.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';

function DashboardStu() {
    const [totalExams, setTotalExams] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        fetchTotalExams();
        fetchTotalQuestions();
    }, []);

    const fetchTotalExams = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/totalExams');
            const data = await response.json();
            setTotalExams(data.totalExams);
        } catch (error) {
            console.error('Error fetching total exams:', error);
        }
    };

    const fetchTotalQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/totalQuestions');
            const data = await response.json();
            setTotalQuestions(data.totalQuestions);
        } catch (error) {
            console.error('Error fetching total questions:', error);
        }
    };

    return (
        <div className="dashboardstu-container">
            <StudentNavSidebarOpen />

            <div className='dashboardstu'>
                <div className='dashboard-exam'>
                <p>Total Exams Available</p>
                <div className="icon-count"> 
                <i className='fas' id='exam-icon1'>&#xf5fc;</i>
                <span className="count">{totalExams}</span>
                </div>
                </div>
                <div className='dashboard-question'>
                <p>Total Questions</p>
                <div className="icon-count">
                <i className="fa" id='dashboard-question'>&#xf059;</i>
                <span className="count">{totalQuestions}</span>
                </div>
                </div>
            </div>
            {/* QuizAppFooter */}
            <QuizAppFooter />

        </div>
    );
}

export default DashboardStu;
