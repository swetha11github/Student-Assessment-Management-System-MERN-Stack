// import react
import React from 'react';

// import Link tag from react-router-dom
import {Link} from 'react-router-dom';

// import Student.css
import '../styles/Student.css';

// import Navbar1
import Navbar1 from './Navbar1';

// import QuizAppFooter
import QuizAppFooter from './QuizAppFooter';

// Student 
function Student() {
    // HTML code
    return (
        // student page container
        <div className="student-container">

            {/* Navbar */}
            <Navbar1 />

            {/* student page heading */}
            <div className='student-heading'>
                <h1>Hello, Student</h1>
                    
                <p>Welcome to Quizzy Brainiacs</p>
            </div> {/* student page heading closed div */}
                
            {/* student page content */}
            <div className='student-content'>
                <p>You can access various features after login.</p>
                    
                {/* button container */}
                <div className="button">

                    {/* studentsignup button */}
                    <Link to='/studentsignup' id='create-account-button'> {/* Link tage is used to navigate studentsignup page */}
                        Create Your Account

                        {/* signup button icon */}
                        <i className='fas'>&#xf101;</i>
                    </Link>

                    {/* studentlogin button */}
                    <Link to='/studentlogin'> {/* Link tage is used to navigate studentlogin page */}
                        Log in

                    {/* login button icon */}
                    <i className='fas'>&#xf2f6;</i>
                    </Link>
                </div> {/* button container closed div */}
            </div> {/* student page content closed div */}
                
            {/* student page footer */}
            <QuizAppFooter />

        </div> // student page container closed div
    );
}

// Export the Student function
export default Student;
