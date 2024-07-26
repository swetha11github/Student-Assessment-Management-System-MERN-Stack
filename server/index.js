// Require the express
const express = require('express');

// Require the mongoose
const mongoose = require('mongoose');

// Require the cors (cross origin resource sharing)
const cors = require('cors');

// Require the jsonwebtoken
const jwt = require('jsonwebtoken');

// Require the bcrypt (password hashing algorithm) client send password to the server $2b$1... this type of format (your pwd is secured)
const bcrypt = require('bcrypt');

// Require the models=>Student
const Student = require('./models/Student');

// Require the models=>Teacher
const Teacher = require('./models/Teacher');

// Require the models=>Exam
const Exam = require('./models/Exam'); // Mongoose model

// Require the models=>Question
const Question = require('./models/Question');

// express store the variable app
const app = express();

// server localhost:5000
const port = process.env.PORT || 5000;

// To use the cors npm 
app.use(cors());

// To use the express(server) sent data in json format
app.use(express.json());

// To connect the mongodb 
mongoose.connect('mongodb://localhost:27017/students', { useNewUrlParser: true, useUnifiedTopology: true }); // localhost:27017 Database student database name


// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

app.get('/studentprofile', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password');
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/teacherprofile', verifyToken, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user.id).select('-password');
        res.json(teacher);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Student registration(signup) 
// (/register)=>http path form register page
app.post('/register', async (req, res) => { // async makes a function handle waiting for tasks to complete without stopping other code.
    // try condition
    try {
        // name,email,password
        const { name, email, password } = req.body;

        // Type the email address store the existingStudent variable 
        const existingStudent = await Student.findOne({ email }); // Student models=>Student
        
        // if condition  
        if (existingStudent) { // existingStudent (email) store

            // To check the 409(You already have an account.) error
            return res.status(409).json({ message: 'You already have an account.' });
        } // if condition closed

        // hashed password are store in hashedPassword variable 
        const hashedPassword = await bcrypt.hash(password, 10);

        // name,emai,password store in newStudent variable
        const newStudent = new Student({ name, email, password: hashedPassword }); // hashedPassword is variable

        // newStudent variable data's are save in mongoose(mongob)
        await newStudent.save();

        // 201(Student registered) message in console
        res.status(201).send('Student registered');
    } // try condition closed
    
    // catch condition
    catch (error) {
        res.status(400).send(error.message);
    } // catch condition closed 
}); // Student registration(signup) closed

// Student login 
app.post('/student/login', async (req, res) => { // (/login)=> http path form login page
    // try condition
    try {
        // email,password
        const { email, password } = req.body;

        // Type the email address store the student variable 
        const student = await Student.findOne({ email });  // Student models=>Student

        // if condition 
        if (!student) { // student (email) store

            // To check the 404(Don't have an account?) error
            return res.status(404).json({ message: "Don't have an account?" });
        } // if condition closed

        // Already stored the hashedPassword to be compared with login page password. login page pwd store in inMatch variable
        const isMatch = await bcrypt.compare(password, student.password); // student database name

        // if condition
        if (!isMatch) { // isMatch (password) not match

            // password are not matched 400(Invalid credentials) message will display
            return res.status(400).send('Invalid credentials');
        } // if condition closed

        // password
        const token = jwt.sign({ id: student._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } // try condition closed
    
    // catch condition
    catch (error) {
        res.status(400).send(error.message);
    }
}); // Student login closed

// Endpoint to get total number of students
app.get('/api/totalStudents', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        res.json({ totalStudents });
    } catch (err) {
        console.error('Error fetching total students:', err);
        res.status(500).json({ error: 'Failed to fetch total students' });
    }
});

// Teacher registration
app.post('/teacher/register', async (req, res) => { // (/register)=>http path form register page
    // try condition
    try {
        // name,email,password
        const { name, email, password } = req.body;

        // Type the email address store the existingTeacher variable 
        const existingTeacher = await Teacher.findOne({ email }); // Teacher models=>Teacher

        // if condition
        if (existingTeacher) { // existingTeacher (email) store

            // To check the 409(You already have an account.) error
            return res.status(409).json({ message: 'You already have an account.' });
        } // if condition closed

        // hashed password are store in hashedPassword variable 
        const hashedPassword = await bcrypt.hash(password, 10);

        // name,emai,password store in newTeacher variable
        const newTeacher = new Teacher({ name, email, password: hashedPassword });

        // newTeacher variable data's are save in mongoose(mmongob)
        await newTeacher.save();

        // 201(Student registered) message in console
        res.status(201).send('Teacher registered');
    } // try condition closed
    
    // catch condition
    catch (error) {
        res.status(400).send(error.message);
    } // catch condition closed
}); // Teacher registration closed

// Teacher login
app.post('/teacher/login', async (req, res) => { // (/login)=> http path form login page
    // try condition
    try {
        // email,password
        const { email, password } = req.body;

        // Type the email address store the teacher variable 
        const teacher = await Teacher.findOne({ email }); // Teacher models=>Teacher

        // if condition
        if (!teacher) { // teacher (email) store

            // To check the 404(Don't have an account?) error
            return res.status(404).json({ message: "Don't have an account?" });
        } // if condition closed

        // Already stored the hashedPassword to be compared with login page password. login page pwd store in inMatch variable
        const isMatch = await bcrypt.compare(password, teacher.password); // teacher database name

        // if condition
        if (!isMatch) { // isMatch (password) not match

            // password are not matched 400(Invalid credentials) message will display
            return res.status(400).send('Invalid credentials');
        } // if condition closed

        // password
        const token = jwt.sign({ id: teacher._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } // try consition closed
    
    // catch condition
    catch (error) {
        res.status(400).send(error.message);
    } // catch condition closed
}); // Teacher login closed

// Endpoint to add a new exam
app.post('/api/addexamtea', async (req, res) => {
    try {
      const { examName, totalQuestions, totalMarks } = req.body;
  
      // Create new exam 
      const newExam = new Exam({
        examName,
        totalQuestions,
        totalMarks,
      });
  
      // Save exam to database
      await newExam.save();
  
      res.status(201).json(newExam);
    } catch (err) {
      console.error('Error adding exam:', err);
      res.status(500).json({ error: 'Failed to add exam' });
    }
  });  

// Endpoint to fetch all exams
app.get('/api/viewexamtea', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

// Endpoint to fetch a specific exam by ID
app.get('/api/exams/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.json(exam);
  } catch (err) {
    console.error('Error fetching exam:', err);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

// Endpoint to update an exam by ID
app.put('/api/updateexamtea/:id', async (req, res) => {
  try {
    const { examName, totalQuestions, totalMarks } = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, {
      examName,
      totalQuestions,
      totalMarks,
    }, { new: true });

    if (updatedExam) {
      res.json(updatedExam);
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(500).json({ error: 'Failed to update exam' });
  }
});

// Endpoint to delete an exam by ID
app.delete('/api/viewexamtea/:id', async (req, res) => {
    try {
      const examId = req.params.id;
      const result = await Exam.findByIdAndDelete(examId);
      if (result) {
        res.status(200).json({ message: 'Exam deleted successfully' });
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      console.error('Error deleting exam:', err);
      res.status(500).json({ error: 'Failed to delete exam' });
    }
  });

// Endpoint to get total number of exams
app.get('/api/totalExams', async (req, res) => {
  try {
      const totalExams = await Exam.countDocuments();
      res.json({ totalExams });
  } catch (err) {
      console.error('Error fetching total exams:', err);
      res.status(500).json({ error: 'Failed to fetch total exams' });
  }
});

// Add question endpoint
app.post('/api/addquestions', async (req, res) => {
  const { examId, studentId, questionText, marks, option1, option2, option3, answer } = req.body;

  try {
    const newQuestion = new Question({
      examId,
      studentId,
      questionText,
      marks,
      options: [option1, option2, option3],
      answer,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error('Error adding question:', err);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

// Endpoint to store particular exam in question
app.get('/api/viewquestions', async (req, res) => {
  try {
    const { examId } = req.query; // examId is passed as a query parameter

    if (!examId) {
      return res.status(400).json({ error: 'examId is required' });
    }

    // Find questions based on examId
    const questions = await Question.find({ examId });
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Endpoint to fetch a specific question by ID
app.get('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params; 

    // Fetch question from database based on ID
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // question data as JSON response
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});


// Update question by ID
app.put('/api/updatequestiontea/:id', async (req, res) => {
  try {
    const { id } = req.params;  
    const { examId, questionText, marks, options, answer } = req.body;

    if (!examId || !questionText || !marks || !options || !answer) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { examId, questionText, marks, options, answer },
      { new: true } 
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(updatedQuestion); 
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

// Endpoint to delete a question by ID
app.delete('/api/viewquestions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

// Endpoint to get total number of questions
app.get('/api/totalQuestions', async (req, res) => {
  try {
      const totalQuestions = await Question.countDocuments();
      res.json({ totalQuestions });
  } catch (err) {
      console.error('Error fetching total questions:', err);
      res.status(500).json({ error: 'Failed to fetch total questions' });
  }
});

// listen to the port 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
