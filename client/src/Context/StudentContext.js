import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [student, setStudent] = useState(null);
    useEffect(() => {
        const fetchStudent = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/studentprofile', {
                        headers: { 'x-auth-token': token }
                    });
                    setStudent(res.data);
                } catch (err) {
                    console.error(err.response.data);
                }
            }
        };
        fetchStudent();
    }, []);

    return (
        <StudentContext.Provider value={{ student, setStudent }}>
            {children}
        </StudentContext.Provider>
    );
};
