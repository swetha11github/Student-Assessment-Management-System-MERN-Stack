import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Question.css';
import QuizAppFooter from './QuizAppFooter';
import StudentNavSidebarOpen from './StudentNavSisebarOpen';
import Timer from './Timer';

function QuestionList() {
    const { examId, examName } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setStartTime(new Date());
        setQuestions([]);
        setUserAnswers([]);
        
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/viewquestions?examId=${examId}`);
                const data = await response.json();
                setQuestions(data);
                setUserAnswers(new Array(data.length).fill(undefined)); 
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [examId]);

    const onPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const onNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const onSubmit = () => {
        const endTime = new Date();
        const duration = Math.floor((endTime - startTime) / 1000);

        let totalMarks = 0;
        userAnswers.forEach((answer, index) => {
            const question = questions[index];
            const correctAnswer = question?.answer;
            const correctAnswerIndex = question.options[parseInt(correctAnswer.replace('option', '')) - 1];
            console.log(`Question ${index + 1}: Correct Answer = ${correctAnswerIndex}, User Answer = ${answer}`);
            if (answer === correctAnswerIndex) {
                totalMarks += question?.marks || 0;
            }
        });

        console.log('Total Marks:', totalMarks);
        console.log('User Answers:', userAnswers);
        console.log('Questions:', questions);

        // Save result in localStorage
        const result = {
            examId,
            examName,
            totalMarks,
            startTime: startTime.toISOString(),
            duration
        };
        const storedResults = JSON.parse(localStorage.getItem('markHistory')) || [];
        storedResults.push(result);
        localStorage.setItem('markHistory', JSON.stringify(storedResults));

        navigate(`/marklist/${examId}/${examName}`, {
            state: {
                totalMarks,
                startTime: startTime.toISOString(),
                duration,
                examName
            }
        });
    };

    const onSelect = (e) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setUserAnswers(newAnswers);
    };

    const onTimeUp = () => {
        alert('Time is up!');
        onSubmit();
    };

    if (!questions || questions.length === 0) {
        return <div>No questions available</div>;
    }

    const question = questions[currentQuestionIndex];
    const checked = userAnswers[currentQuestionIndex];

    return (
        <div className="question-container">
            <StudentNavSidebarOpen />

            <div className='question-container-body'>
                <div className='question-heading'>
                    <h1>{examName} Quiz</h1>
                    {question && <h2>Question {currentQuestionIndex + 1} of {questions.length}:</h2>}
                    <Timer initialMinutes={5} initialSeconds={0} onTimeUp={onTimeUp} />
                </div>

                {question ? (
                    <div className='question'>
                        <h3>{question.questionText}</h3>
                        <ul key={question._id}>
                            {question.options.map((option, i) => (
                                <li key={i}>
                                    <input
                                        type="radio"
                                        value={option}
                                        name={`question${currentQuestionIndex}`}
                                        id={`q${i}-option`}
                                        checked={checked === option}
                                        onChange={onSelect}
                                    />
                                    <label htmlFor={`q${i}-option`}>{option}</label>
                                    <div className={`check ${checked === option ? 'checked' : ''}`}></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>No question available</div>
                )}

                <div className='prev-next-btn'>
                    {currentQuestionIndex > 0 && (
                        <button className='btn-prev' onClick={onPrev}>
                            <i id='prev-icon'>&laquo;</i> Prev
                        </button>
                    )}
                    {currentQuestionIndex < questions.length - 1 && (
                        <button className='btn-next' onClick={onNext}>
                            Next <i id='next-icon'>&raquo;</i>
                        </button>
                    )}
                    {currentQuestionIndex === questions.length - 1 && (
                        <button className='btn-submit' onClick={onSubmit}>
                            Submit
                        </button>
                    )}
                </div>
            </div>
            <QuizAppFooter />
        </div>
    );
}

export default QuestionList;
