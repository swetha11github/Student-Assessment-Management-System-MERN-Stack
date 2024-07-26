// import react
import React from 'react';

// import Link tag from react-router-dom
import {Link} from 'react-router-dom';

// import Teacher.css
import '../styles/Teacher.css';

// import Navbar1 
import Navbar1 from './Navbar1';

// import QuizAppFooter 
import QuizAppFooter from './QuizAppFooter';

// Teacher
function Teacher() {
    // HTML code
    return (
        // teacher page container
        <div className="teacher-container">

            {/* Navbar */}
            <Navbar1 />

            {/* teacher page heading */}
            <div className='teacher-heading'>
                
                <h1>Hello, Teacher</h1>
                    
                <p>Welcome to Quizzy Brainiacs</p>
            </div> {/*teacher page heading closed div */}

            {/* teacher page content */}
            <div className='teacher-content'>
                <p>You can access various features after login.</p>
                    
                {/* button container */}
                <div className="button">
                        
                    {/* signup button */}
                        <Link to='/teachersignup' id='create-account-button'> {/* Link tag is used to navigate the teachersignup page */}
                            Create Your Account

                        {/* signup button icon */}
                        <i className='fas'>&#xf101;</i>
                        </Link>

                    {/* signup button */}
                        <Link to='/teacherlogin'> {/* Link tag is used to navigate the teachersignup page */}
                            Log in
                        
                        {/* login button icon */}
                        <i className='fas'>&#xf2f6;</i>
                        </Link>
                </div> {/* button container closed div */}
            </div> {/* teacher page content closed div */}
            
            {/* teacher page footer */}
            <QuizAppFooter />

        </div> // teacher page container closed div
    );
}

// Export the Teacher function 
export default Teacher;
