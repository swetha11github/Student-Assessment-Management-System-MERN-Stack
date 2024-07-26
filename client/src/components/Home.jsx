// import react 
import React from 'react';

// import Link tag from react-router-dom
import { Link } from 'react-router-dom';

// import Home.css
import '../styles/Home.css';

// import Navbar1 
import Navbar1 from './Navbar1';

// import QuizAppFooter
import QuizAppFooter from './QuizAppFooter';

// Home
function Home() {
    // HTML code
    return (
        // Home page container
        <div className="container-fluid">

            {/* Navbar1 */}
            <Navbar1 />

            {/* Home page body */}
            <div className="mt-5">
                {/* Home page content */}
                <h1>Let's Quiz</h1>
                
                <h3>Test your skills and become a master!</h3>
                
                <p>Explore our diverse range of quizzes on various topics.</p>
                
                <p>Sign up now to access millions of quizzes tailored to your interests.</p>
                
                <h5>Start your journey here!</h5>
                
                {/* student signup button */}
                <div className="signup-button">
                    <Link to='/studentsignup'> {/* Link tag used to navigate the studentsignup page */}
                        Sign up 
                        
                        {/* signup button icon */}
                        <i className='fas'>&#xf101;</i>
                    </Link> 
                </div>
            </div> {/* Home page body closed div */}
            
            {/* QuizAppFooter */}
            <QuizAppFooter />

        </div> // Home page container closed div
    );
}

// Export the Home function
export default Home;
