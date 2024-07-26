import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from '../Context/StudentContext';
import '../styles/StudentDashboard.css';

function StudentNavSidebarClose() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { student } = useContext(StudentContext);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="dashboard-navbar">
                <Link to='/' className="navbar-brand">Quizzy Brainiacs</Link>
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
            </nav>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <img src="https://as1.ftcdn.net/v2/jpg/02/42/38/06/1000_F_242380676_MgcF84njOboTScGtP3rSwccsrkLSnVCz.jpg" alt="avatar" className='student-img' />
                <div className='student-name'>
                    <h1>{student ? student.name : 'Student'}</h1>
                    <p>(Student)</p>
                </div>
                <Link to="/dashboardstu" className="sidebar-link">
                    <i className="material-icons" id='sidebar-icon-dashboard'>&#xe871;</i>
                    <span>Dashboard</span>
                </Link>
                <Link to="/examstu" className="sidebar-link">
                    <i className='fas' id='sidebar-icon-exam'>&#xf5fc;</i>
                    <span>Exam</span>
                </Link>
                <Link to="/markstu" className="sidebar-link">
                    <i className="fa" id='sidebar-icon-mark'>&#xf00c;</i>
                    <span>Marks</span>
                </Link>
            </div>
        </>
    );
}

export default StudentNavSidebarClose;
