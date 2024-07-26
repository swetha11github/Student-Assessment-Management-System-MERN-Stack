import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TeacherContext } from '../Context/TeacherContext';
import '../styles/TeacherDashboard.css';

function TeacherNavSidebarOpen() {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { teacher } = useContext(TeacherContext);

    // toggleSidebar function
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        // Any additional logic to run when the component mounts
    }, []);

    return (
        <>
            {/* Navbar */}
            <nav className="dashboard-navbar">
                {/* App name Quizzy Brainiacs */}
                <Link to='/' className="navbar-brand">Quizzy Brainiacs</Link> {/* Link tag used to navigate the home page */}
                {/* Menu icon */}
                <div className={`menuicon-container ${isSidebarOpen ? 'change' : ''}`} onClick={toggleSidebar}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className='navbar-logout-button'>
                    <Link to='/logoutsuccesspage' className="nav-link">
                        Log out <i className='fa'>&#xf08b;</i>
                    </Link>
                </div>
            </nav> {/* Navbar closed */}

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                
                <img src="https://e7.pngegg.com/pngimages/349/288/png-clipart-teacher-education-student-course-school-avatar-child-face-thumbnail.png" alt="avater" className='teacher-img' />
                <div className='teacher-name'>
                    <h1>{teacher ? teacher.name : 'Teacher'}</h1>
                    <p>(Teacher)</p>
                </div>
                <Link to="/dashboardtea" className="sidebar-link">
                <i className="material-icons" id='sidebar-icon-dashboard'>&#xe871;</i>  
                <span>Dashboard</span> 
                </Link>
                <Link to="/examtea" className="sidebar-link">
                <i className='fas' id='sidebar-icon-exam'>&#xf5fc;</i>
                <span>Exam</span>
                </Link>
                <Link to="/questiontea" className="sidebar-link">
                <i className="fa" id='question-icon'>&#xf059;</i>
                <span>Questions</span>
                </Link>
            </div>
        </>
    );
}

export default TeacherNavSidebarOpen;
