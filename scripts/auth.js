
// Authentication Related Functions

// Initialize admin user if not exists
function initializeAdmin() {
  const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
  const adminExists = users.some(user => user.username === 'harsh');
  
  if (!adminExists) {
    users.push({
      id: 'admin-1',
      username: 'harsh',
      password: 'mlpqaz098',
      role: 'admin'
    });
    localStorage.setItem('quizUsers', JSON.stringify(users));
  }
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Check if current user is admin
function isAdmin() {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return user.role === 'admin';
}

// Login function
function login(username, password) {
  
  if (username === 'harsh' && password === 'mlpqaz098') {
    const adminUser = {
      id: 'admin-1',
      username: 'harsh',
      role: 'admin'
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    return true;
  }
  
  
  const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    const userData = {
      id: user.id,
      username: user.username,
      role: 'user'
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  }
  
  return false;
}

// Signup function
function signup(username, password) {
  const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
  
  // Check if username already exists
  if (users.some(user => user.username === username)) {
    return false;
  }
  
  // Create new user
  const newUser = {
    id: 'user-' + Date.now(),
    username,
    password,
    role: 'user'
  };
  
  users.push(newUser);
  localStorage.setItem('quizUsers', JSON.stringify(users));
  
  // Auto login
  const userData = {
    id: newUser.id,
    username: newUser.username,
    role: 'user'
  };
  localStorage.setItem('currentUser', JSON.stringify(userData));
  
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Render login form
function renderLogin() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="auth-container container">
      <h1>AI MCQ System - Login</h1>
      <div id="login-alert" class="alert" style="display: none;"></div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required>
      </div>
      <button id="login-button" type="button">Login</button><br><br>
      <p style="color: grey;">name = "harsh" password = "mlpqaz098"</p>
      <a href="#" class="auth-link" id="to-signup">Don't have an account? Sign up</a>
    </div>
  `;
  
  document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
      showAlert('login-alert', 'Please enter both username and password', 'error');
      return;
    }
    
    const loginSuccess = login(username, password);
    
    if (loginSuccess) {
      window.location.href = '#intro';
    } else {
      showAlert('login-alert', 'Invalid username or password', 'error');
    }
  });
  
  document.getElementById('to-signup').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '#signup';
  });
}

// Render signup form
function renderSignup() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="auth-container container">
      <h1>AI MCQ System - Sign Up</h1>
      <div id="signup-alert" class="alert" style="display: none;"></div>
      <div class="form-group">
        <label for="new-username">Username</label>
        <input type="text" id="new-username" placeholder="Choose a username" required>
      </div>
      <div class="form-group">
        <label for="new-password">Password</label>
        <input type="password" id="new-password" placeholder="Choose a password" required>
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder="Confirm your password" required>
      </div>
      <button id="signup-button" type="button">Sign Up</button>
      <a href="#" class="auth-link" id="to-login">Already have an account? Login</a>
    </div>
  `;
  
  document.getElementById('signup-button').addEventListener('click', function() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (!username || !password || !confirmPassword) {
      showAlert('signup-alert', 'Please fill out all fields', 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      showAlert('signup-alert', 'Passwords do not match', 'error');
      return;
    }
    
    if (password.length < 6) {
      showAlert('signup-alert', 'Password must be at least 6 characters long', 'error');
      return;
    }
    
    const signupSuccess = signup(username, password);
    
    if (signupSuccess) {
      window.location.href = '#intro';
    } else {
      showAlert('signup-alert', 'Username already exists', 'error');
    }
  });
  
  document.getElementById('to-login').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = '#login';
  });
}

// Show alert message
function showAlert(elementId, message, type) {
  const alert = document.getElementById(elementId);
  alert.innerHTML = message;
  alert.className = `alert alert-${type}`;
  alert.style.display = 'block';
}
