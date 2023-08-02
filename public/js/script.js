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
document.getElementById("signupButton").addEventListener("click", function() {
   document.getElementById("signup-modal").style.display = "block";
 });
 
 // Close the sign-up modal when the close button is clicked
 document.getElementById("close-button").addEventListener("click", function() {
   document.getElementById("signup-modal").style.display = "none";
 });




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

// Add event listeners for the login modal
document.getElementById('loginButton').addEventListener('click', openModal);
document.getElementById('loginclose-button').addEventListener('click', closeModal);


// client.js
async function checkLoginStatus() {
  try {
    const response = await fetch('/api/login-status');
    const data = await response.json();

    // data.isLoggedIn will be true if the user is logged in
    // Update the UI based on the login status
    if (data.isLoggedIn) {
      // Show a logged-in user interface
      showLoggedInUI();
    } else {
      // Show a non-logged-in user interface
      showNonLoggedInUI();
    }
  } catch (error) {
    console.error('Error fetching login status:', error);
  }
}

function showLoggedInUI() {
  // Update the UI to show elements for logged-in users
  // Remove the "Register" and "Log In" buttons
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  signupButton.style.display = 'none';
  loginButton.style.display = 'none';
  document.getElementById('loginForm').style.display = 'none';

  // Display the profile settings with an image
  const profileSettings = document.getElementById('profileSettings');
  profileSettings.innerHTML = `
          <div id="profile-dropdown">
              <img src="https://i.imgur.com/r79g1jQ.jpg" class="profile-img" id="profile-image" alt="User Profile" />
              <input type="file" id="image-input" style="display: none;">
              <ul class="dropdown-menu">
                <li><a href="profile.html">Profile</a></li>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="#" id="logoutButton">Logout</a></li>
              </ul>
        </div>
          `;
          document.addEventListener("click", function (event) {
            const dropdown = document.querySelector(".dropdown-menu");
            const profileDropdown = document.getElementById("profile-dropdown");
          
            if (!profileDropdown.contains(event.target)) {
              dropdown.style.display = "none";
            }
          });
          
          document.getElementById("profile-dropdown").addEventListener("click", function () {
            const dropdown = document.querySelector(".dropdown-menu");
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
          });

         // Add event listener for the "Log Out" button
      const logoutButton = document.getElementById('logoutButton');
      logoutButton.addEventListener('click', showLogoutModal);

      getProfileImageFromLocalStorage()

}


function showNonLoggedInUI() {
  // Update the UI to show elements for non-logged-in users
   // Remove the "Register" and "Log In" buttons
   const signupButton = document.getElementById('signupButton');
   const loginButton = document.getElementById('loginButton');
   const profileSettings = document.getElementById('profileSettings');
  
   profileSettings.style.display = 'none';
   signupButton.style.display = 'block';
   loginButton.style.display = 'block';
  document.getElementById('loginForm').style.display = 'block';

}

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

 const logoutModalz = document.getElementById('logoutModal');
 const closeModalz = document.getElementById('closelogoutModal');
 const confirmLogout = document.getElementById('confirmLogout');
 const cancelLogout = document.getElementById('cancelLogout');

 // Function to show the logout modal
 function showLogoutModal() {
  logoutModalz.style.display = 'block';
 }

 // Function to close the logout modal
 function closeLogoutModal() {
   logoutModalz.style.display = 'none';
 }

 // Event listener for the close button in the modal
 closeModalz.addEventListener('click', closeLogoutModal);

 // Event listener for the "Log Out" button in the modal
 confirmLogout.addEventListener('click', () => {
   // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
  console.log('Logging out...');

   // Close the modal after logout
   closeLogoutModal();
 });


 function getProfileImageFromLocalStorage() {
  // Retrieve the image data from local storage
  const storedProfileImage = localStorage.getItem('profileImage');
  console.log(storedProfileImage);

  // Check if the profile image URL exists in local storage
  if (storedProfileImage) {
    // Get the profile image element
    const profileImage = document.querySelector(".profile-img");

    // Set the profile image URL as the source for the profile image
    profileImage.src = storedProfileImage;
  }
}

// Call the function to set the profile image from local storage on page load
document.addEventListener("DOMContentLoaded", getProfileImageFromLocalStorage);





