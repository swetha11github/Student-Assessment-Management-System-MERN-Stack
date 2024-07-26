// import react
import React from 'react';

// import Link tag from react-router-dom
import { Link } from 'react-router-dom';

// import Home.css
import '../styles/Navbar1.css';

// Navbar1
function Navbar1() {
  // HTML code
  return (
    //Navbar
    <nav className="navbar">

        {/* App name Quizzy Brainiacs */}
        <Link to='/' className="navbar-brand">Quizzy Brainiacs</Link> {/* Link tag used to navigate the home page */}

        {/* Navbar items */}
        <div className="navbar-nav">
            <div className="nav-item"><Link to='/' className="nav-link">Home</Link></div> {/* Link tag used to navigate the home page */}
            
            <div className="nav-item"><Link to='/teacher' className="nav-link">Teacher</Link></div> {/* Link tag used to navigate the teacher page */}
            
            <div className="nav-item"><Link to='/student' className="nav-link">Student</Link></div> {/* Link tag used to navigate the student page */}
        </div> {/* Navbar items closed div */}
    </nav> //Navbar closed
  );
}

// Export Navbar1 function
export default Navbar1;