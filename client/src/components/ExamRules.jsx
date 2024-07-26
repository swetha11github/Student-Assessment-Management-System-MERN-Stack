import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../styles/ExamRules.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';

function ExamRules() {
  const {examId, examName } = useParams();

    return (
        <div className="examrules-container">
            <StudentNavSidebarOpen />
            <div className='examrules-container-body'>
              <h1>Before you start the Exam, here are the rules</h1>
              <h2>Exam Details:</h2>
              <p>1. Exam Name: {examName}</p>
              <p>2. Total Questions: 5</p>
              <p>3. Total Marks: 5</p>
              <p>4. Duration: 5 minutes</p>
              <h2>Rules:</h2>
              <p>1. You will be asked 5 question one after another.</p>
              <p>2. Each question has three options, you can choose only one options.</p>
              <p>3. You can review and change answers before the quiz finish.</p>
              <p>4. The result will be declared at the end of the quiz.</p>
              <Link to={`/questionlist/${examId}/${examName}`}>
                <button className='start-quiz'>Let's start</button>
              </Link>
              <p id='startquiz-wishes'>"Best wishes as you embark on your quiz journey!"</p>
            </div>

            
            {/* QuizAppFooter */}
            <QuizAppFooter />

        </div>
    );
}

export default ExamRules;
