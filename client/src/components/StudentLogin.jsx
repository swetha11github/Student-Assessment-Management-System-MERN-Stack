import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../Context/StudentContext';
import '../styles/StudentLogin.css';

function StudentLogin() {
    const { setStudent } = useContext(StudentContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setErrors({});
        setLoginError('');

        try {
            const response = await fetch('http://localhost:5000/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json().catch(() => null);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setStudent(data); 
                navigate('/studentdashboard');
            } else {
                setLoginError(data?.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred. Please try again.');
        }
    };

    const handleSignupClick = () => {
        navigate('/studentsignup');
    };

    return (
        <div className="studentlogin-container">
            <h2>Student Login</h2>
            <form className="studentlogin-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    aria-label="Email"
                />
                {errors.email && <div className="error">{errors.email}</div>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    aria-label="Password"
                />
                {errors.password && <div className="error">{errors.password}</div>}
                <button type="submit">Log in</button>
                {loginError && <div className="login-error">{loginError}</div>}
                {loginError === "Don't have an account?" && (
                    <button type="button" className="signup-button" onClick={handleSignupClick}>
                        Sign up
                    </button>
                )}
            </form>
        </div>
    );
}

export default StudentLogin;
