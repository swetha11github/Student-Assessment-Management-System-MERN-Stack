import React, { useContext }  from 'react';
import { TeacherContext } from '../Context/TeacherContext';
import '../styles/TeacherDashboard.css';
import TeacherNavSidebarClose from './TeacherNavSidebarClose';
import QuizAppFooter from './QuizAppFooter';

function TeacherDashboard() {
    const { teacher } = useContext(TeacherContext);
    return (
        <div className="teacherdashboard-container">
            <TeacherNavSidebarClose />
            <div className='hello-teacher'>
                <h1>Hello, {teacher ? teacher.name : 'Teacher'}</h1>
                <p>Inspire, teach, and lead</p>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default TeacherDashboard;
