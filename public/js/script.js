let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
};

window.onscroll = () =>{
   menu.classList.remove('fa-times');
   navbar.classList.remove('active');
};


var swiper = new Swiper(".home-slider", {
      loop:true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
   });
   
var swiper = new Swiper(".reviews-slider", {
      grabCursor:true,
      loop:true,
      autoHeight:true,
      spaceBetween: 20,
      breakpoints: {
         0: {
           slidesPerView: 1,
         },
         700: {
           slidesPerView: 2,
         },
         1000: {
           slidesPerView: 3,
         },
      },
   });

// Typed.js initialization in all slides
var typedElements = document.querySelectorAll(".multiple-text");
for (var i = 0; i < typedElements.length; i++) {
  var typed = new Typed(typedElements[i], {
    strings: ['TOUR AROUND THE PHILIPPINES', 'EMBRACE THE NEW DESTINATION', 'DISCOVER THE UNEXPLORED'],
   //  strings: ["TOUR AROUND THE PHILIPPINES" + (i + 1) + "EMBRACE THE NEW DESTINATION", "DISCOVER THE UNEXPLORED"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
    showCursor: false, // Set to false to remove the cursor
  });
}



/* ==========scroll reveal========= */
ScrollReveal({ 
   // reset: true,
   distance: '80px',
   duration: 2000,
   delay: 200
});

ScrollReveal().reveal('.swiper, .heading-title', { origin: 'top' });
ScrollReveal().reveal('.about, .reviews, .home-offer, .home-packages, .home-about, .box-container, .booking', { origin: 'bottom' });
ScrollReveal().reveal('.partner, .services, .heading', { origin: 'left' });
ScrollReveal().reveal('.tables, .about-content', { origin: 'right' });


// Open the sign-up modal when the sign-up button is clicked
document.getElementById("signup-button").addEventListener("click", function() {
   document.getElementById("signup-modal").style.display = "block";
 });
 
 // Close the sign-up modal when the close button is clicked
 document.getElementById("close-button").addEventListener("click", function() {
   document.getElementById("signup-modal").style.display = "none";
 });

 // Function to save user data to local storage
function saveUserData(userData) {
   // Get existing user data from local storage
   const existingData = localStorage.getItem('userList');
   let userList = [];
 
   if (existingData) {
     userList = JSON.parse(existingData);
   }
 
   // Add the new user data to the array
   userList.push(userData);
 
   // Save the updated array to local storage as a JSON string
   localStorage.setItem('userList', JSON.stringify(userList));
 }
 
 // Function to handle form submission
 function handleSignUpFormSubmit(event) {
   event.preventDefault();
 
   // Get form values
   const fullname = document.getElementById('fullname').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const role = document.getElementById('role').value;
 
   // Create an object with the user's details
   const userData = {
     fullname: fullname,
     email: email,
     password: password,
     role: role
   };
 
   // Save user data to local storage
   saveUserData(userData);
 
   // Clear the form after saving
   document.getElementById('signup-form').reset();
 
   // Display a success message or redirect the user to another page
   // (You can add more functionality here as needed)
   alert('Sign up successful!');
 }
 
 // Add event listener to the form submit event
 document.getElementById('signup-form').addEventListener('submit', handleSignUpFormSubmit);





//  log in credentials
// Sample user list stored in local storage (for demonstration purposes)
// const userList = [
//   { username: "user1", password: "password1", profilePicture: "path_to_profile_picture1.jpg" },
//   { username: "user2", password: "password2", profilePicture: "path_to_profile_picture2.jpg" }
// ];
// const userList = [
//   { username: "user1", password: "password1", profilePicture: "path_to_profile_picture1.jpg" },
//   { username: "user2", password: "password2", profilePicture: "path_to_profile_picture2.jpg" }
// ];

// let isLoggedIn = false;


// Function to show the login modal
function openModal() {
  const loginModal = document.getElementById("login-modal");
  loginModal.style.display = "block";
}

// Function to close the login modal
function closeModal() {
  const loginModal = document.getElementById("login-modal");
  loginModal.style.display = "none";
}

// Function to handle the login form submission
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const role = document.getElementById('login-role').value;


  // Retrieve saved user data from local storage
  const savedData = JSON.parse(localStorage.getItem('userList'));
 
  // Find the user in the user list based on the provided username
  // const user = userList.find(u => u.email === emailInput);

    // Check if the entered email and password match any saved data
    const user = savedData.find(data => data.email === email && data.password === password && data.role === role);
    if (user) {
      // Log in successful
      const profilePicture = document.getElementById("profilePicture");
      profilePicture.src = user.profilePicture;
      closeModal(); // Close the login modal
      showProfile(); // Show the profile information in the navbar
      alert(`Welcome back, ${user.fullname}! You are logged in as ${role}.`);
    } else {
      // Invalid login credentials
      alert('Invalid email, password or role. Please try again.');
    }
  }
//   if (user && user.password === passwordInput) {
//     // Successful login
//     r
//   } else {
//     // Invalid credentials
//     alert("Invalid username or password.");
//   }
// }

// Function to handle the logout action
function logout() {
  const profilePicture = document.getElementById("profilePicture");
  profilePicture.src = ""; // Clear the profile picture
  showLoginButtons(); // Show the login and register buttons in the navbar
}

// Function to show the profile information in the navbar
function showProfile() {
  const profileSection = document.getElementById("profileSection");
  profileSection.style.display = "flex";
  const dropBtn = document.getElementById("dropBtn");
  dropBtn.style.display = "block";

  const registerButton = document.getElementById("signup-button");
  const loginButton = document.getElementById("login-button");
  registerButton.style.display = "none";
  loginButton.style.display = "none";
}

// Function to show the login and register buttons in the navbar
function showLoginButtons() {
  const profileSection = document.getElementById("profileSection");
  profileSection.style.display = "none";
  const dropBtn = document.getElementById("dropBtn");
  dropBtn.style.display = "none";

  const registerButton = document.getElementById("signup-button");
  const loginButton = document.getElementById("login-button");
  registerButton.style.display = "inline-block";
  loginButton.style.display = "inline-block";
}

 // Function to toggle the dropdown menu
 function toggleDropdown() {
  if (isLoggedIn) {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
  }
}

// Populate the profile picture when the page loads (assuming the user is logged in)
document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.getElementById("profilePicture");
  const isLoggedIn = false; // Replace this with your actual authentication check
  if (isLoggedIn) {
    profilePicture.src = "public\images\Alex Gay.jpg";
    showProfile();
  } else {
    profilePicture.src = "";
    showLoginButtons();
  }
});

// Add event listener to the login form submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  login();
});

// Add event listeners for the login modal
document.getElementById('login-button').addEventListener('click', openModal);
document.getElementById('loginclose-button').addEventListener('click', closeModal);


 

 