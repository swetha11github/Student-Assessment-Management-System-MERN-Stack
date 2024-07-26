import React, { useState, useEffect } from 'react';
import '../styles/DashboardTea.css';
import QuizAppFooter from './QuizAppFooter';
import TeacherNavSidebarOpen from './TeacherNavSidebarOpen';

function DashboardTea() {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalExams, setTotalExams] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        fetchTotalExams();
        fetchTotalQuestions();
        fetchTotalStudents();
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

    const fetchTotalStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/totalStudents');
            const data = await response.json();
            setTotalStudents(data.totalStudents);
        } catch (error) {
            console.error('Error fetching total students:', error);
        }
    };

    return (
        <div className="dashboardtea-container">
            <TeacherNavSidebarOpen />
            <div className="dashboardtea">
                <div className="total-student">
                    <p>Total Students</p>
                    <div className="icon-count-container">
                        <i className="fas" id="student-icon">&#xf501;</i>
                        <span className="count">{totalStudents}</span>
                    </div>
                </div>
                <div className="total-exam">
                    <p>Total Exams</p>
                    <div className="icon-count-container">
                        <i className="fas" id="exam-icon">&#xf5fc;</i>
                        <span className="count">{totalExams}</span>
                    </div>
                </div>
                <div className="total-question">
                    <p>Total Questions</p>
                    <div className="icon-count-container">
                        <i className="fas" id="question-icon">&#xf059;</i>
                        <span className="count">{totalQuestions}</span>
                    </div>
                </div>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default DashboardTea;
