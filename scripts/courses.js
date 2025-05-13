
// Courses and Questions Management

// Sample courses
const sampleCourses = [
  {
    id: 'course-1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    questions: [
      {
        id: 'js-q1',
        text: 'Which of the following is a primitive data type in JavaScript?',
        options: ['Array', 'Object', 'String', 'Function'],
        correctAnswer: 2,
        difficulty: 'medium'
      },
      {
        id: 'js-q2',
        text: 'What is the result of 2 + "2" in JavaScript?',
        options: ['4', '"22"', 'TypeError', '22'],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        id: 'js-q3',
        text: 'Which method is used to add an element at the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        id: 'js-q4',
        text: 'What does the "===" operator do in JavaScript?',
        options: [
          'Assigns a value',
          'Compares values only',
          'Compares values and types',
          'Logical OR'
        ],
        correctAnswer: 2,
        difficulty: 'medium'
      },
      {
        id: 'js-q5',
        text: 'Which of these is a closure in JavaScript?',
        options: [
          'A function that returns another function',
          'A variable outside a function',
          'A function that has access to variables from its outer scope',
          'A method in an object'
        ],
        correctAnswer: 2,
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'course-2',
    title: 'React Basics',
    description: 'Introduction to React library and component-based architecture',
    questions: [
      {
        id: 'react-q1',
        text: 'What is React?',
        options: [
          'A programming language',
          'A JavaScript library for building user interfaces',
          'A database management system',
          'A styling framework'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      },
      {
        id: 'react-q2',
        text: 'What function is used to update state in a React functional component?',
        options: ['this.state()', 'useState()', 'setState()', 'reactState()'],
        correctAnswer: 1,
        difficulty: 'medium'
      },
      {
        id: 'react-q3',
        text: 'Which hook is used for side effects in React?',
        options: ['useEffect()', 'useSideEffect()', 'useAfterRender()', 'useState()'],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        id: 'react-q4',
        text: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'JavaScript Extension',
          'Java Syntax Extension',
          'JavaScript Syntax XML'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        id: 'react-q5',
        text: 'How to pass data from parent to child component?',
        options: ['Using state', 'Using props', 'Using context', 'Using Redux'],
        correctAnswer: 1,
        difficulty: 'hard'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Python Programming',
    description: 'Introduction to Python programming language',
    questions: [
      {
        id: 'py-q1',
        text: 'Which of the following is NOT a built-in data type in Python?',
        options: ['List', 'Dictionary', 'Tuple', 'Array'],
        correctAnswer: 3,
        difficulty: 'medium'
      },
      {
        id: 'py-q2',
        text: 'What is the correct way to create a function in Python?',
        options: [
          'function myFunc():',
          'def myFunc():',
          'create myFunc():',
          'func myFunc():'
        ],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        id: 'py-q3',
        text: 'Which of these is used to comment a single line in Python?',
        options: ['//', '/* */', '#', '--'],
        correctAnswer: 2,
        difficulty: 'easy'
      },
      {
        id: 'py-q4',
        text: 'What is the output of print(2**3) in Python?',
        options: ['5', '6', '8', 'Error'],
        correctAnswer: 2,
        difficulty: 'medium'
      },
      {
        id: 'py-q5',
        text: 'Which Python library is commonly used for data manipulation and analysis?',
        options: ['NumPy', 'Pandas', 'Matplotlib', 'Sklearn'],
        correctAnswer: 1,
        difficulty: 'hard'
      }
    ]
  }
];

// Initialize courses in local storage
function initializeCourses() {
  if (!localStorage.getItem('quizCourses')) {
    localStorage.setItem('quizCourses', JSON.stringify(sampleCourses));
  }
}

// Get all courses
function getCourses() {
  return JSON.parse(localStorage.getItem('quizCourses') || '[]');
}

// Get course by ID
function getCourseById(courseId) {
  const courses = getCourses();
  return courses.find(course => course.id === courseId);
}

// Add new course
function addCourse(title, description) {
  const courses = getCourses();
  const newCourse = {
    id: 'course-' + Date.now(),
    title,
    description,
    questions: []
  };
  
  courses.push(newCourse);
  localStorage.setItem('quizCourses', JSON.stringify(courses));
  return newCourse;
}

// Update course
function updateCourse(id, title, description) {
  const courses = getCourses();
  const updatedCourses = courses.map(course => {
    if (course.id === id) {
      return { ...course, title, description };
    }
    return course;
  });
  
  localStorage.setItem('quizCourses', JSON.stringify(updatedCourses));
}

// Delete course
function deleteCourse(id) {
  const courses = getCourses();
  const filteredCourses = courses.filter(course => course.id !== id);
  localStorage.setItem('quizCourses', JSON.stringify(filteredCourses));
}

// Add question to course
function addQuestion(courseId, text, options, correctAnswer, difficulty) {
  const courses = getCourses();
  const updatedCourses = courses.map(course => {
    if (course.id === courseId) {
      const newQuestion = {
        id: 'question-' + Date.now(),
        text,
        options,
        correctAnswer,
        difficulty
      };
      
      return {
        ...course,
        questions: [...course.questions, newQuestion]
      };
    }
    return course;
  });
  
  localStorage.setItem('quizCourses', JSON.stringify(updatedCourses));
}

// Delete question
function deleteQuestion(courseId, questionId) {
  const courses = getCourses();
  const updatedCourses = courses.map(course => {
    if (course.id === courseId) {
      return {
        ...course,
        questions: course.questions.filter(question => question.id !== questionId)
      };
    }
    return course;
  });
  
  localStorage.setItem('quizCourses', JSON.stringify(updatedCourses));
}

// Save exam result
function saveExamResult(userId, courseId, courseName, score, totalQuestions) {
  const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
  
  const newResult = {
    id: 'result-' + Date.now(),
    userId,
    courseId,
    courseName,
    score,
    totalQuestions,
    date: new Date().toISOString()
  };
  
  results.push(newResult);
  localStorage.setItem('quizResults', JSON.stringify(results));
  
  return newResult;
}

// Get user results
function getUserResults(userId) {
  const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
  return results.filter(result => result.userId === userId);
}

// Get all results (for admin)
function getAllResults() {
  return JSON.parse(localStorage.getItem('quizResults') || '[]');
}

// Render course list
function renderCourseList() {
  const app = document.getElementById('app');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  const courses = getCourses();
  
  let html = `
    <div class="container">
      <div class="header">
        <h1>Choose a Course</h1>
        <div class="nav">
          <ul>
            <li><a href="#dashboard">My Dashboard</a></li>
            ${currentUser.role === 'admin' ? '<li><a href="#admin">Admin Panel</a></li>' : ''}
            <li><a href="#" id="logout-button">Logout</a></li>
          </ul>
        </div>
      </div>
      <div class="course-list">
  `;
  
  courses.forEach(course => {
    html += `
      <div class="course-card" data-course-id="${course.id}">
        
        <h2>${course.title}</h2>
        <p>${course.description}</p><br>
        <p><strong>Questions:</strong> ${course.questions.length}</p>
        <br>
        <button class="start-quiz" data-course-id="${course.id}">Start Quiz</button>
      </div>
    `;
  });
  
  html += `
      </div>
    </div>
  `;
  
  app.innerHTML = html;
  
  // Add event listeners
  document.querySelectorAll('.start-quiz').forEach(button => {
    button.addEventListener('click', function() {
      const courseId = this.getAttribute('data-course-id');
      window.location.href = `#quiz:${courseId}`;
    });
  });
  
  document.getElementById('logout-button').addEventListener('click', function(e) {
    e.preventDefault();
    logout();
  });
}

// Render intro page
function renderIntro() {
  const app = document.getElementById('app');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  app.innerHTML = `
    <div class="container">
      <div class="header">
        <h1>Welcome to AI MCQ System</h1>
        <div class="nav">
          <ul>
            <li><a href="#dashboard">My Dashboard</a></li>
            ${currentUser.role === 'admin' ? '<li><a href="#admin">Admin Panel</a></li>' : ''}
            <li><a href="#" id="logout-button">Logout</a></li>
          </ul>
        </div>
      </div>
      <div class="intro-content">
        <h2>Hello, ${currentUser.username}!</h2>
        <p>Welcome to our adaptive MCQ system. Here you can test your knowledge on various subjects with questions that adapt to your skill level.</p>
        <p>The system starts with medium difficulty questions. If you answer correctly, you'll get harder questions. If you answer incorrectly, you'll get easier questions.</p>
        <h3>How it works:</h3>
        <ul>
          <li>Choose a course from our list</li>
          <li>Answer questions that adapt to your skill level</li>
          <li>View your results and performance in your dashboard</li>
        </ul>
        <button id="start-button">Choose a Course</button>
      </div>
    </div>
  `;
  
  document.getElementById('start-button').addEventListener('click', function() {
    window.location.href = '#courses';
  });
  
  document.getElementById('logout-button').addEventListener('click', function(e) {
    e.preventDefault();
    logout();
  });
}

// Render dashboard
function renderDashboard() {
  const app = document.getElementById('app');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  const results = getUserResults(currentUser.id);
  
  let html = `
    <div class="container">
      <div class="header">
        <h1>Your Dashboard</h1>
        <div class="nav">
          <ul>
            <li><a href="#courses">Courses</a></li>
            ${currentUser.role === 'admin' ? '<li><a href="#admin">Admin Panel</a></li>' : ''}
            <li><a href="#" id="logout-button">Logout</a></li>
          </ul>
        </div>
      </div>
      
      <h2>Your Exam Results</h2>
  `;
  
  if (results.length === 0) {
    html += `<p>You haven't taken any exams yet.</p>`;
  } else {
    html += `
      <table class="result-list">
        <thead>
          <tr>
            <th>Course</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    results.forEach(result => {
      const date = new Date(result.date).toLocaleDateString();
      html += `
        <tr>
          <td>${result.courseName}</td>
          <td>${result.score}/${result.totalQuestions}</td>
          <td>${date}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
    `;
  }
  
  html += `
    <button id="courses-button" class="secondary">Back to Courses</button>
    </div>
  `;
  
  app.innerHTML = html;
  
  document.getElementById('courses-button').addEventListener('click', function() {
    window.location.href = '#courses';
  });
  
  document.getElementById('logout-button').addEventListener('click', function(e) {
    e.preventDefault();
    logout();
  });
}

// Render admin panel
function renderAdmin() {
  if (!isAdmin()) {
    window.location.href = '#courses';
    return;
  }
  
  const app = document.getElementById('app');
  
  let html = `
    <div class="container">
      <div class="header">
        <h1>Admin Panel</h1>
        <div class="nav">
          <ul>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#" id="logout-button">Logout</a></li>
          </ul>
        </div>
      </div>
      
      <div class="tab-buttons">
        <button class="tab-button active" data-tab="courses">Manage Courses</button>
        <button class="tab-button" data-tab="questions">Manage Questions</button>
        <button class="tab-button" data-tab="results">View Results</button>
      </div>
      
      <div id="tab-content" class="admin-section">
        <!-- Tab content will be rendered here -->
      </div>
    </div>
  `;
  
  app.innerHTML = html;
  
  // Handle tab switching
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      renderAdminTab(this.getAttribute('data-tab'));
    });
  });
  
  // Render the first tab by default
  renderAdminTab('courses');
  
  document.getElementById('logout-button').addEventListener('click', function(e) {
    e.preventDefault();
    logout();
  });
}

// Render admin tab content
function renderAdminTab(tabName) {
  const tabContent = document.getElementById('tab-content');
  
  switch(tabName) {
    case 'courses':
      renderAdminCourses(tabContent);
      break;
    case 'questions':
      renderAdminQuestions(tabContent);
      break;
    case 'results':
      renderAdminResults(tabContent);
      break;
  }
}

// Render admin courses tab
function renderAdminCourses(container) {
  const courses = getCourses();
  
  let html = `
    <h2>Manage Courses</h2>
    
    <div class="admin-form">
      <h3>Add New Course</h3>
      <div class="form-group">
        <label for="course-title">Course Title</label>
        <input type="text" id="course-title" placeholder="Enter course title">
      </div>
      <div class="form-group">
        <label for="course-description">Course Description</label>
        <input type="text" id="course-description" placeholder="Enter course description">
      </div>
      <button id="add-course-button">Add Course</button>
    </div>
    
    <h3>Existing Courses</h3>
  `;
  
  if (courses.length === 0) {
    html += `<p>No courses available.</p>`;
  } else {
    html += `<div class="course-list">`;
    courses.forEach(course => {
      html += `
        <div class="course-card">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <p><strong>Questions:</strong> ${course.questions.length}</p>
          <div>
            <button class="delete-course danger" data-course-id="${course.id}">Delete Course</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }
  
  container.innerHTML = html;
  
  // Add event listeners
  document.getElementById('add-course-button').addEventListener('click', function() {
    const title = document.getElementById('course-title').value;
    const description = document.getElementById('course-description').value;
    
    if (!title || !description) {
      alert('Please fill out all fields');
      return;
    }
    
    addCourse(title, description);
    renderAdminCourses(container);
  });
  
  document.querySelectorAll('.delete-course').forEach(button => {
    button.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
        const courseId = this.getAttribute('data-course-id');
        deleteCourse(courseId);
        renderAdminCourses(container);
      }
    });
  });
}

// Render admin questions tab
function renderAdminQuestions(container) {
  const courses = getCourses();
  
  let html = `
    <h2>Manage Questions</h2>
    
    <div class="form-group">
      <label for="select-course">Select Course</label>
      <select id="select-course">
        <option value="">-- Select a course --</option>
  `;
  
  courses.forEach(course => {
    html += `<option value="${course.id}">${course.title}</option>`;
  });
  
  html += `
      </select>
    </div>
    
    <div id="question-management" style="display: none;">
      <!-- Question management will be rendered here -->
    </div>
  `;
  
  container.innerHTML = html;
  
  // Add event listeners
  document.getElementById('select-course').addEventListener('change', function() {
    const courseId = this.value;
    if (courseId) {
      renderQuestionManagement(courseId);
    } else {
      document.getElementById('question-management').style.display = 'none';
    }
  });
}

// Render question management for a course
function renderQuestionManagement(courseId) {
  const course = getCourseById(courseId);
  const questionManagement = document.getElementById('question-management');
  
  let html = `
    <h3>Questions for ${course.title}</h3>
    
    <div class="admin-form">
      <h4>Add New Question</h4>
      <div class="form-group">
        <label for="question-text">Question Text</label>
        <input type="text" id="question-text" placeholder="Enter question text">
      </div>
      
      <div class="form-group">
        <label>Options</label>
        <input type="text" id="option-0" placeholder="Option 1">
        <input type="text" id="option-1" placeholder="Option 2">
        <input type="text" id="option-2" placeholder="Option 3">
        <input type="text" id="option-3" placeholder="Option 4">
      </div>
      
      <div class="form-group">
        <label for="correct-answer">Correct Answer</label>
        <select id="correct-answer">
          <option value="0">Option 1</option>
          <option value="1">Option 2</option>
          <option value="2">Option 3</option>
          <option value="3">Option 4</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="difficulty">Difficulty</label>
        <select id="difficulty">
          <option value="easy">Easy</option>
          <option value="medium" selected>Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      <button id="add-question-button">Add Question</button>
    </div>
    
    <h4>Existing Questions</h4>
  `;
  
  if (course.questions.length === 0) {
    html += `<p>No questions available for this course.</p>`;
  } else {
    course.questions.forEach((question, index) => {
      html += `
        <div class="container">
          <div class="question-header">
            <h4>Question ${index + 1}</h4>
            <span class="difficulty difficulty-${question.difficulty}">${question.difficulty}</span>
          </div>
          <p>${question.text}</p>
          <ul>
      `;
      
      question.options.forEach((option, optIndex) => {
        html += `
          <li>${optIndex === question.correctAnswer ? '✓ ' : ''}${option}</li>
        `;
      });
      
      html += `
          </ul>
          <button class="delete-question danger" data-question-id="${question.id}">Delete Question</button>
        </div>
      `;
    });
  }
  
  questionManagement.innerHTML = html;
  questionManagement.style.display = 'block';
  
  // Add event listeners
  document.getElementById('add-question-button').addEventListener('click', function() {
    const text = document.getElementById('question-text').value;
    const options = [
      document.getElementById('option-0').value,
      document.getElementById('option-1').value,
      document.getElementById('option-2').value,
      document.getElementById('option-3').value
    ];
    const correctAnswer = parseInt(document.getElementById('correct-answer').value);
    const difficulty = document.getElementById('difficulty').value;
    
    if (!text || options.some(option => !option)) {
      alert('Please fill out all fields');
      return;
    }
    
    addQuestion(courseId, text, options, correctAnswer, difficulty);
    renderQuestionManagement(courseId);
  });
  
  document.querySelectorAll('.delete-question').forEach(button => {
    button.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
        const questionId = this.getAttribute('data-question-id');
        deleteQuestion(courseId, questionId);
        renderQuestionManagement(courseId);
      }
    });
  });
}

// Render admin results tab
function renderAdminResults(container) {
  const results = getAllResults();
  const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
  
  let html = `
    <h2>All Exam Results</h2>
  `;
  
  if (results.length === 0) {
    html += `<p>No exam results available.</p>`;
  } else {
    html += `
      <table class="result-list">
        <thead>
          <tr>
            <th>User</th>
            <th>Course</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    results.forEach(result => {
      const user = users.find(user => user.id === result.userId) || { username: 'Unknown' };
      const date = new Date(result.date).toLocaleDateString();
      html += `
        <tr>
          <td>${user.username}</td>
          <td>${result.courseName}</td>
          <td>${result.score}/${result.totalQuestions}</td>
          <td>${date}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
    `;
  }
  
  container.innerHTML = html;
}
