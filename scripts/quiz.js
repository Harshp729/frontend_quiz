
// Quiz related functions

// Render the quiz page
function renderQuiz(courseId) {
  const course = getCourseById(courseId);
  if (!course || course.questions.length === 0) {
    alert('No questions available for this course');
    window.location.href = '#courses';
    return;
  }
  
  const app = document.getElementById('app');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Start with a medium difficulty question
  const mediumQuestions = course.questions.filter(q => q.difficulty === 'medium');
  let firstQuestion;
  
  if (mediumQuestions.length > 0) {
    // Get a random medium question
    firstQuestion = mediumQuestions[Math.floor(Math.random() * mediumQuestions.length)];
  } else {
    // If no medium questions, get any question
    firstQuestion = course.questions[0];
  }
  
  // Initialize quiz state
  const quizState = {
    courseId: course.id,
    courseName: course.title,
    currentQuestionIndex: 0,
    questions: [firstQuestion],
    answers: [],
    currentDifficulty: firstQuestion.difficulty
  };
  
  // Store quiz state
  sessionStorage.setItem('quizState', JSON.stringify(quizState));
  
  renderCurrentQuestion();
}

// Render the current question
function renderCurrentQuestion() {
  const app = document.getElementById('app');
  const quizState = JSON.parse(sessionStorage.getItem('quizState'));
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  
  let html = `
    <div class="quiz-container container">
      <div class="header">
        <h1>Quiz</h1>
        <div class="nav">
          <ul>
            <li><a href="#" id="exit-quiz">Exit Quiz</a></li>
          </ul>
        </div>
      </div>
      
      <div class="question-container">
        <h2>Question ${quizState.currentQuestionIndex + 1}</h2>
        <p class="difficulty difficulty-${currentQuestion.difficulty}">${currentQuestion.difficulty}</p>
        <h3>${currentQuestion.text}</h3>
        
        <div class="options">
  `;
  
  currentQuestion.options.forEach((option, index) => {
    html += `
      <div class="option" data-index="${index}">
        ${option}
      </div>
    `;
  });
  
  html += `
        </div>
        
        <button id="submit-answer" disabled>Submit Answer</button>
      </div>
    </div>
  `;
  
  app.innerHTML = html;
  
  // Add event listeners
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Add selected class to clicked option
      this.classList.add('selected');
      
      // Enable submit button
      document.getElementById('submit-answer').disabled = false;
    });
  });
  
  document.getElementById('submit-answer').addEventListener('click', function() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) return;
    
    const selectedIndex = parseInt(selectedOption.getAttribute('data-index'));
    handleAnswer(selectedIndex);
  });
  
  document.getElementById('exit-quiz').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to exit the quiz? Your progress will be lost.')) {
      sessionStorage.removeItem('quizState');
      window.location.href = '#courses';
    }
  });
}

// Handle the user's answer
function handleAnswer(selectedIndex) {
  const quizState = JSON.parse(sessionStorage.getItem('quizState'));
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  
  // Check if answer is correct
  const isCorrect = selectedIndex === currentQuestion.correctAnswer;
  
  // Store the answer
  quizState.answers.push({
    questionId: currentQuestion.id,
    selectedAnswer: selectedIndex,
    isCorrect
  });
  
  // Show the result
  showAnswerResult(isCorrect, currentQuestion.correctAnswer);
  
  // Update quiz state
  sessionStorage.setItem('quizState', JSON.stringify(quizState));
  
  // Wait 2 seconds before moving to next question
  setTimeout(function() {
    moveToNextQuestion(isCorrect);
  }, 2000);
}

// Show the result of the answer
function showAnswerResult(isCorrect, correctAnswer) {
  const options = document.querySelectorAll('.option');
  const submitButton = document.getElementById('submit-answer');
  
  // Disable options and submit button
  options.forEach(option => {
    option.style.pointerEvents = 'none';
  });
  submitButton.disabled = true;
  
  // Show correct and incorrect answers
  options.forEach((option, index) => {
    if (index === correctAnswer) {
      option.classList.add('correct');
    } else if (option.classList.contains('selected')) {
      option.classList.add('incorrect');
    }
  });
  
  // Update the submit button
  submitButton.textContent = isCorrect ? 'Correct! 🎉' : 'Incorrect ❌';
  submitButton.classList.add(isCorrect ? 'correct' : 'incorrect');
}

// Move to the next question
function moveToNextQuestion(wasCorrectAnswer) {
  const quizState = JSON.parse(sessionStorage.getItem('quizState'));
  const course = getCourseById(quizState.courseId);
  
  // Determine next difficulty
  let nextDifficulty;
  if (wasCorrectAnswer) {
    // If correct, increase difficulty or stay at hard
    nextDifficulty = quizState.currentDifficulty === 'easy' ? 'medium' : 'hard';
  } else {
    // If incorrect, decrease difficulty or stay at easy
    nextDifficulty = quizState.currentDifficulty === 'hard' ? 'medium' : 'easy';
  }
  
  // Update current difficulty
  quizState.currentDifficulty = nextDifficulty;
  
  // Check if we've reached the question limit (5 questions max)
  if (quizState.questions.length >= 5) {
    finishQuiz();
    return;
  }
  
  // Find questions of the next difficulty that haven't been used
  const usedQuestionIds = quizState.questions.map(q => q.id);
  const availableQuestions = course.questions.filter(q => 
    q.difficulty === nextDifficulty && !usedQuestionIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) {
    // If no questions of next difficulty, try any difficulty
    const anyAvailableQuestions = course.questions.filter(q => !usedQuestionIds.includes(q.id));
    
    if (anyAvailableQuestions.length === 0) {
      // If all questions have been used, finish the quiz
      finishQuiz();
      return;
    }
    
    // Get a random question
    const nextQuestion = anyAvailableQuestions[Math.floor(Math.random() * anyAvailableQuestions.length)];
    quizState.questions.push(nextQuestion);
  } else {
    // Get a random question of the next difficulty
    const nextQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    quizState.questions.push(nextQuestion);
  }
  
  // Move to the next question
  quizState.currentQuestionIndex++;
  sessionStorage.setItem('quizState', JSON.stringify(quizState));
  
  renderCurrentQuestion();
}

// Finish the quiz
function finishQuiz() {
  const quizState = JSON.parse(sessionStorage.getItem('quizState'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Calculate score
  const score = quizState.answers.filter(answer => answer.isCorrect).length;
  
  // Save result
  const result = saveExamResult(
    currentUser.id,
    quizState.courseId,
    quizState.courseName,
    score,
    quizState.questions.length
  );
  
  renderQuizResult(result);
}

// Render the quiz result
function renderQuizResult(result) {
  const app = document.getElementById('app');
  
  let html = `
    <div class="container">
      <div class="header">
        <h1>Quiz Completed</h1>
      </div>
      
      <div class="result-container">
        <h2>Your Results</h2>
        <h3>${result.courseName}</h3>
        <div class="score-container">
          <p class="score">Score: ${result.score}/${result.totalQuestions}</p>
          <p>Percentage: ${Math.round((result.score / result.totalQuestions) * 100)}%</p>
        </div>
        
        <div class="button-container">
          <button id="dashboard-button">View Dashboard</button>
          <button id="courses-button" class="secondary">Back to Courses</button>
        </div>
      </div>
    </div>
  `;
  
  app.innerHTML = html;
  
  // Add event listeners
  document.getElementById('dashboard-button').addEventListener('click', function() {
    sessionStorage.removeItem('quizState');
    window.location.href = '#dashboard';
  });
  
  document.getElementById('courses-button').addEventListener('click', function() {
    sessionStorage.removeItem('quizState');
    window.location.href = '#courses';
  });
}
