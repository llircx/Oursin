// Main authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const signinContainer = document.getElementById('signinContainer');
    const welcomeContainer = document.getElementById('welcomeContainer');
    const welcomeName = document.getElementById('welcomeName');
    const welcomeStore = document.getElementById('welcomeStore');
    const signoutButton = document.getElementById('signoutButton');
    
    // Configuration - change to false for production use with real API
    const LOCAL_TESTING = true;
  
    // Check if user is already logged in
    checkAuthStatus();
  
    // Handle signin form submission
    if (signinForm) {
      signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        
        // Validate inputs
        if (!email || !password) {
          showError('Please fill in all fields');
          return;
        }
        
        // Send login request to API
        login(email, password);
      });
    }
  
    // Handle signout
    if (signoutButton) {
      signoutButton.addEventListener('click', function() {
        logout();
      });
    }
    
    // Function to show error messages
    function showError(message) {
      // Create error element if it doesn't exist
      let errorElement = document.querySelector('.error-message');
      if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        signinForm.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  
    // Function to handle login
    function login(email, password) {
      if (LOCAL_TESTING) {
        console.log("Using local test mode - no API calls will be made");
    
        if (email === "admin@gmail.com" && password === "Admin123") {
          const mockResponse = {
            token: "your-mock-token-here",
            isAdmin: true
          };
    
          // Store token and isAdmin in localStorage
          localStorage.setItem('authToken', mockResponse.token);
          localStorage.setItem('isAdmin', mockResponse.isAdmin);
    
          const user = parseJwt(mockResponse.token);
          window.location.href = "Dashboard.html";
    
          showWelcomeScreen(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
        } else {
          showError('Invalid email or password. Please try again.');
        }
      } else {
        fetch('http://project01spiderx.runasp.net/api/Account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        .then(async response => {
          const data = await response.json();
          
          if (!response.ok) {
            console.error('Server error response:', data); // 👈 log server error details
            throw new Error(data.message || 'Login failed');
          }
          
          return data;
        })
        .then(data => {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('isAdmin', data.isAdmin);
        
          const user = parseJwt(data.token);
          console.log("Dashboard")
          window.location.href = "Dashboard.html";
          
          showWelcomeScreen(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
        })
        .catch(error => {
          console.error('Error:', error);
          showError(error.message || 'Invalid email or password. Please try again.');
        });
        
      }
    }
    
  
    // Function to check authentication status
    function checkAuthStatus() {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const user = parseJwt(token);
          const currentTime = Math.floor(Date.now() / 1000);
    
          if (user.exp && user.exp > currentTime) {
            showWelcomeScreen(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
            return;
          }
        } catch (e) {
          console.error('Invalid token:', e);
        }
    
        logout();
      }
    }
    
    

  
    // Function to show welcome screen
    function showWelcomeScreen(email) {
      if (signinContainer) signinContainer.style.display = 'none';
      if (welcomeContainer) {
        welcomeContainer.style.display = 'block';
        
        // Extract username from email
        const username = email.split('@')[0];
        welcomeName.textContent = username;
        
        // Check if user is admin
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        welcomeStore.textContent = isAdmin ? 'Admin Dashboard' : 'Customer Portal';
      }
    }
  
    // Function to handle logout
    function logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAdmin');
    
      if (signinContainer) signinContainer.style.display = 'block';
      if (welcomeContainer) welcomeContainer.style.display = 'none';
    
      if (document.getElementById('signin-email')) {
        document.getElementById('signin-email').value = '';
        document.getElementById('signin-password').value = '';
      }
    
      const errorElement = document.querySelector('.error-message');
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }
    
  
    // Function to parse JWT token
    function parseJwt(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Error parsing JWT:', e);
        return {};
      }
    }
    
    
    function fillTestCredentials() {
      if (document.getElementById('signin-email') && document.getElementById('signin-password')) {
        document.getElementById('signin-email').value = 'admin@gmail.com';
        document.getElementById('signin-password').value = 'Admin123!';
      }
    }
  });


  ///////////////sing up ///////////////////////////////////
  document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const signupContainer = document.getElementById("signupContainer");
    const welcomeContainer = document.getElementById("welcomeContainer");
    const welcomeName = document.getElementById("welcomeName");
    const welcomeStore = document.getElementById("welcomeStore");

    // Sign-up form submission
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phoneNumber = document.getElementById("phonenumber").value;
        const address = document.getElementById("address").value;

        // Validate email format
        if (!validateEmail(email)) {
            showError(signupForm, "Please enter a valid email address");
            return;
        }

        // Prepare the data for the API request
        const userData = {
            fullName: fullname,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber
        };

        // Make the API request to register the user
        fetch("http://project01spiderx.runasp.net/api/Account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Show welcome message if registration is successful
                showWelcomeMessage(fullname, "Your store name");  // You can add more logic here to get the actual store name
            } else {
                showError(signupForm, data.message || "Something went wrong!");
            }
        })
        .catch((error) => {
            showError(signupForm, "Error: " + error.message);
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showWelcomeMessage(fullname, storeName) {
        document.querySelector(".auth-forms-container").style.display = "none";
        welcomeName.textContent = fullname;
        welcomeStore.textContent = storeName;
        welcomeContainer.style.display = "block";
    }

    function showError(form, message) {
        const existingError = form.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent = message;
        form.appendChild(errorElement);
        errorElement.style.display = "block";

        setTimeout(() => {
            errorElement.style.display = "none";
        }, 3000);
    }
});
