import React from 'react';
import { Link } from 'react-router-dom';
import QuizAppFooter from './QuizAppFooter';
import Navbar1 from './Navbar1';
import '../styles/Home.css';

export default function LogoutSuccessPage() {
  return (
        <div className="container-fluid">
            {/* Navbar1 */}
            <Navbar1 />
          <div className="mt-6">
              <h1>You've successfully logged out!</h1>
              <p>Thank you for using our application. You're now logged out of your account.</p>
              <div className="backtohome">
                    <Link to='/'>
                        <span>Back to Home</span>                        
                        <i className='fas'>&#xf015;</i>
                    </Link> 
                </div>
          </div>
          <QuizAppFooter />
        </div>
  );
}
