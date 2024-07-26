import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/teacherprofile', {
                        headers: { 'x-auth-token': token }
                    });
                    setTeacher(res.data);
                } catch (err) {
                    console.error(err.response.data);
                }
            }
        };

        fetchTeacher();
    }, []);

    return (
        <TeacherContext.Provider value={{ teacher, setTeacher }}>
            {children}
        </TeacherContext.Provider>
    );
};
