// import react and useState
import React, { useState, useContext } from 'react';

// import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

import { TeacherContext } from '../Context/TeacherContext';

// import TeacherLogin.css
import '../styles/TeacherLogin.css';

// TeacherLogin
function TeacherLogin() {       
    const { setTeacher } = useContext(TeacherContext);

    // useState set to email and setEmail
    const [email, setEmail] = useState('');

    // useState set to password and setPassword
    const [password, setPassword] = useState('');

    // useState set to errors and setErrors
    const [errors, setErrors] = useState({});

    // useState set to LoginError and setLoginError
    const [loginError, setLoginError] = useState('');

    // useNavigate to store navigate variable
    const navigate = useNavigate();

    // To validate the teacherlogin form
    const validateForm = () => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password.trim()) newErrors.password = 'Password is required';
        return newErrors;
    };

    // handleSubmit function
    const handleSubmit = async (e) => { // (e) is the event

        // To call the preventDefault function
        e.preventDefault();

        // validateForm function to store formErros variable
        const formErrors = validateForm();

        // if condition is used to formErrors length > 0 condition is true formErrors store to the setErrors
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({}); // To call the setErrors function
        setLoginError(''); // To call the setLoginError function

        // try condition
        try {
            // localhost:5000 is store to the response variable
            const response = await fetch('http://localhost:5000/teacher/login', { // teacher datacollection, http path form login page
                method: 'POST', // Data sent from client to server
                headers: {
                    'Content-Type': 'application/json', // Json format data
                },
                body: JSON.stringify({ email, password }), // To change the object type data (email, password) in string type
            });

            // if condition is used for login successfully to navigate the TeacherDashboard page
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setTeacher(data); // TeacherContext 
                navigate('/teacherDashboard');
            } 
            
            // elseif condition is used to 404 (Don't have an account?) error will display
            else if (response.status === 404) {
                // 404 error will store into data variable
                const data = await response.json();

                // 404 error will store into setLoginError
                setLoginError(data.message); // server side 404 error store in message  
            } 
            
            // else condition is used to email and password incorrect to display the Login failed message
            else {
                setLoginError('Login failed');
            }
        } // try condition closed
        
        // catch condition is used for network error to display the An error occurred. Please try again.
        catch (error) {
            setLoginError('An error occurred. Please try again.');
        } // catch condition closed
    }; // handleSubmit function closed


    // handleSignupClick function Don't have an account? will display, show the signup button to navigate signup page
    const handleSignupClick = () => {
        navigate('/teachersignup');
    }; // handleSignupClick function closed
    
    // HTML code
    return (
        // teacherlogin page container
        <div className="teacherlogin-container">
            <h2>Teacher Login</h2>

            {/* teacherlogin page form */}
            <form className="teacherlogin-form" onSubmit={handleSubmit}> {/* onSubmit is used for form is submit that time to call the handleSubmit function */}
                
                {/* input field for email */}
                <input
                    type="email"
                    
                    name="email"
                    
                    placeholder="Email"
                    
                    value={email}
                    
                    onChange={(e) => setEmail(e.target.value)}
                    
                    autoComplete="email" // autoComplete is already store email will display dropdown list
                /> {/* input field for email closed tag */ }

                {/* To submit the form not fill the email field to display Email is required message */}
                {errors.email && <div className="error">{errors.email}</div>}

                {/* input field for password */}
                <input
                    type="password"
                    
                    name="password"
                    
                    placeholder="Password"
                    
                    value={password}
                    
                    onChange={(e) => setPassword(e.target.value)}
                    
                    autoComplete="new-password" // autoComplete is already store password will display dropdown list
                /> {/* input field for password closed tag */ }

                {/* To submit the form not fill the password field to display Password is required message */}
                {errors.password && <div className="error">{errors.password}</div>}

                {/* login button */}
                <button type="submit">Log in</button>

                {/* To display the LoginError An error occurred. Please try again. */}
                {loginError && <div className="login-error">{loginError}</div>}

                {/* To type the email,password is not in myteacherCollection database will display the Don't have an account? */}
                {loginError === "Don't have an account?" && (

                    // Occurred the Don't have an account? message to show the signup button 
                    <button className="signup-button" onClick={handleSignupClick}> {/* onClick is used to submit form that time call the handleSignupClick function */}
                        Sign up
                    </button>
                )}
            </form> {/* teacherlogin page form closed tag */}
        </div> // teacherlogin page container closed div
    );
}

// Export the TeacherLogin function
export default TeacherLogin;
