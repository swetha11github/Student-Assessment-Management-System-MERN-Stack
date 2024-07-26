// import react and useState
import React, { useState } from 'react';

// import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

// import StudentSignup.css
import '../styles/StudentSignup.css';

// StudentSignup 
function StudentSignup() {
    // useState set to name and setName
    const [name, setName] = useState('');

    // useState set to email and setEmail
    const [email, setEmail] = useState('');

    // useState set to password and setPassword
    const [password, setPassword] = useState('');

    // useState set to errors and setErrors
    const [errors, setErrors] = useState({});

    // useState set to signupError and setSignupError
    const [signupError, setSignupError] = useState('');

    // useNavigate to store navigate variable
    const navigate = useNavigate();

    // To validate the studentsignup form
    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
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
        setSignupError(''); // To call the setLoginError function
        
        // try condition
        try {
            // localhost:5000 is store to the response variable
            const response = await fetch('http://localhost:5000/register', { // http path form register page
                method: 'POST', // Data sent from client to server
                headers: {
                    'Content-Type': 'application/json', // Json format data
                },
                body: JSON.stringify({ name, email, password }), // To change the object type data (name, email, password) in string type 
            });

            // if condition is used for login successfully to navigate the Studentlogin page  
            if (response.ok) {
                navigate('/studentlogin');
            } 
            
            // elseif condition is used to 409 (You already have an account.) error will display
            else if (response.status === 409) {

                // 409 error will store into data variable
                const data = await response.json();

                // 409 error will store into setSignupError
                setSignupError(data.message); // server side 404 error store in message
            } 
            
            // else condition is used to name, email, password incorrect to display the signup failed message
            else {
                setSignupError('Signup failed');
            }
        } // try condition closed
        
        // catch condition is used for network error to display the An error occurred. Please try again.
        catch (error) {
            setSignupError('An error occurred. Please try again.');
        } // catch condition closed
    }; // handleSubmit function closed

    // handleLoginClick function
    const handleLoginClick = () => {
        navigate('/studentlogin');
    }; // handleLoginClick fucntion closed

    // HTML code
    return (
        // studentsignup page container
        <div className="studentsignup-container">
            <h2>Student Signup</h2>

            {/* studentsignup page form */}
            <form className="studentsignup-form" onSubmit={handleSubmit}> {/* onSubmit is used for form is submit that time to call the handleSubmit function */}
                
                {/* input field for name */}
                <input
                    type="text"
                    
                    name="name"
                    
                    placeholder="Name"
                    
                    value={name}
                    
                    onChange={(e) => setName(e.target.value)}
                    
                    autoComplete="name" // autoComplete is already store name will display dropdown list
                /> {/* input field for name closed tag */}

                {/* To submit the form not fill the name field to display Name is required message */}
                {errors.name && <div className="error">{errors.name}</div>}

                {/* input field for email */}
                <input
                    type="email"
                    
                    name="email"
                    
                    placeholder="Email"
                    
                    value={email}
                    
                    onChange={(e) => setEmail(e.target.value)}
                    
                    autoComplete="email" // autoComplete is already store email will display dropdown list
                /> {/* input field for email closed tag */}

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
                /> {/* input field for password closed tag */}

                {/* To submit the form not fill the password field to display Password is required message */}
                {errors.password && <div className="error">{errors.password}</div>}

                {/* signup button */}
                <button type="submit">Sign up</button>

                {/* To display the SignupError An error occurred. Please try again. */}
                {signupError && <div className="signup-error">{signupError}</div>}

                {/* To type the name,email,password this data's are already store in myStudentCollection database will display the You already have an account. */}
                {signupError === 'You already have an account.' && (
                    
                    // Occurred the You already have an account. message to show the login button 
                    <button className="login-button" onClick={handleLoginClick}> {/* onClick is used to submit form that time call the handleSignupClick function */}
                        Log in
                    </button>
                )} 
            </form> {/* studentsignup page form closed tag */}
        </div> // studentsignup page container closed div
    );
}

// Export the StudentSignup function
export default StudentSignup;
