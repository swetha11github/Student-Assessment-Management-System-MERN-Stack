// import react 
import React from 'react';

// import react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Icon link
import '@fortawesome/fontawesome-free/css/all.min.css';

// import Home page
import Home from '../components/Home';

// import Student page
import Student from '../components/Student';

// import Teacher page
import Teacher from '../components/Teacher';

// import TeacherSignup page
import TeacherSignup from '../components/TeacherSignup';

// import TeacherLogin page
import TeacherLogin from '../components/TeacherLogin';

// import StudentSignup page
import StudentSignup from '../components/StudentSignup';

// import StudentLogin page
import StudentLogin from '../components/StudentLogin';

// import StudentDashboard page
import StudentDashboard from './StudentDashboard';

// import DasboardStu page
import DashboardStu from './DashboardStu';

// import ExamStu page
import ExamStu from './ExamStu';

// import MarkStu page
import MarkStu from './MarkStu';

// import TeacherDashboard page
import TeacherDashboard from './TeacherDashboard';

// import DasboardTea page
import DashboardTea from './DashboardTea';

// import ExamTea page
import ExamTea from './ExamTea';

// import ExamRules page
import ExamRules from './ExamRules';

// import QuestionList page
import QuestionList from './QuestionList';

// import MarkList page
import MarkList from './MarkList';

// import ViewExamMarks page
import ViewExamMarks from './ViewExamMarks';

// import StudentContext
import { StudentProvider } from '../Context/StudentContext';

// import TeacherContext
import { TeacherProvider } from '../Context/TeacherContext';

// import ViewExamTea page
import ViewExamTea from './ViewExamTea';

// import LogoutSuccessPage page
import LogoutSuccessPage from './LogoutSuccessPage';

// import AddExamTea page
import AddExamTea from './AddExamTea';

// import QuestionTea page
import QuestionTea from './QuestionTea';

// import AddQuestionTea page
import AddQuestionTea from './AddQuestionTea';

// import SelectCourseViewQuestiontea
import SeleteCourseViewQuestionTea from './SelectCourseViewQuestionTea';

// import ViewQuestionTea page
import ViewQuestionTea from './ViewQuestionTea';

// import UpdateQuestionTea page
import UpdateQuestionTea from './UpdateQuestionTea';

// import UpdateExamTea page
import UpdateExamTea from './UpdateExamTea';

// App 
function App() {
    // HTML code
    return (
        <StudentProvider>
            <TeacherProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} /> {/* / http path from home page */}

                        <Route path="/studentsignup" element={<StudentSignup />} /> {/* / http path from student page */}

                        <Route path="/studentlogin" element={<StudentLogin />} /> {/* / http path from studentlogin page */}

                        <Route path='/teacher' element={<Teacher />} /> {/* / http path from teacher page */}

                        <Route path='/student' element={<Student />} /> {/* / http path from student page */}

                        <Route path='/teachersignup' element={<TeacherSignup />} /> {/* / http path from teachersignup page */}

                        <Route path='/teacherlogin' element={<TeacherLogin />} /> {/* / http path from teacherlogin page */}

                        <Route path='/studentdashboard' element={<StudentDashboard />} /> {/* / http path from studentdashboard page */}

                        <Route path='/dashboardstu' element={<DashboardStu />} /> {/* / http path from dashboardstu page */}

                        <Route path='/examstu' element={<ExamStu />} /> {/* / http path from examstu page */}

                        <Route path='/markstu' element={<MarkStu />} /> {/* / http path from markstu page */}

                        <Route path='/teacherdashboard' element={<TeacherDashboard />} /> {/* / http path from teacherdashboard page */}

                        <Route path='/dashboardtea' element={<DashboardTea />} /> {/* / http path from dashboardtea page */}

                        <Route path='/examtea' element={<ExamTea />} /> {/* / http path from examtea page */}

                        <Route path='/examrules/:examId/:examName' element={<ExamRules />} /> {/* / http path from examrules page */}

                        <Route path='/questionlist/:examId/:examName' element={<QuestionList />} /> {/* / http path from questionlist page */}

                        <Route path='/marklist/:examId/:examName' element={<MarkList />} /> {/* / http path from marklist page */}

                        <Route path='/viewexammmarks' element={<ViewExamMarks />} /> {/* / http path from viewexammarks page */}

                        <Route path='/viewexamtea' element={<ViewExamTea />} /> {/* / http path from viewexamtea page */}

                        <Route path='/logoutsuccesspage' element={<LogoutSuccessPage />} /> {/* / http path from logoutsuccesspage page */}

                        <Route path='/addexamtea' element={<AddExamTea />} /> {/* / http path from addexamtea page */}

                        <Route path="/updateexamtea/:id" element={<UpdateExamTea />} /> {/* / http path from updateexamtea page */}

                        <Route path='/questiontea' element={<QuestionTea />} /> {/* / http path from questiontea page */}

                        <Route path='/addquestiontea' element={<AddQuestionTea />} /> {/* / http path from addquestiontea page */}

                        <Route path='/seletecourseviewquestiontea' element={<SeleteCourseViewQuestionTea />} /> {/* / http path from seletecourseviewquestiontea page */}

                        <Route path="/viewquestiontea" element={<ViewQuestionTea />} /> {/* / http path from viewquestiontea page */}

                        <Route path="/updatequestiontea/:id" element={<UpdateQuestionTea />} /> {/* / http path from updatequestiontea page */}
                    </Routes>
                </Router>
            </TeacherProvider>
        </StudentProvider>
    );
}

// Export the App function
export default App;
