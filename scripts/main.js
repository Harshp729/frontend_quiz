
// Main application script

// Initialize the app
function initApp() {
  // Initialize admin user
  initializeAdmin();
  
  // Initialize courses
  initializeCourses();
  
  // Handle hash-based routing
  window.addEventListener('hashchange', handleRouteChange);
  
  // Initial route handling
  handleRouteChange();
}

// Handle route changes
function handleRouteChange() {
  const hash = window.location.hash || '#login';
  const route = hash.split(':')[0];
  
  // Check if user is logged in for protected routes
  if (route !== '#login' && route !== '#signup' && !isLoggedIn()) {
    window.location.hash = '#login';
    return;
  }
  
  // Route handling
  switch (route) {
    case '#login':
      renderLogin();
      break;
    case '#signup':
      renderSignup();
      break;
    case '#intro':
      renderIntro();
      break;
    case '#courses':
      renderCourseList();
      break;
    case '#quiz':
      const courseId = hash.split(':')[1];
      renderQuiz(courseId);
      break;
    case '#dashboard':
      renderDashboard();
      break;
    case '#admin':
      if (isAdmin()) {
        renderAdmin();
      } else {
        window.location.hash = '#courses';
      }
      break;
    default:
      window.location.hash = isLoggedIn() ? '#intro' : '#login';
      break;
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
