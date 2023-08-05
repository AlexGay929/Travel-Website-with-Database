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

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
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



  const logoutModalz = document.getElementById('logoutModal');
  const closeModalz = document.getElementById('logoutModal');
  const confirmLogout = document.getElementById('confirmLogout');

 // Function to show the logout modal
 function showLogoutModal() {
  logoutModalz.style.display = 'block';
 }

 // Function to close the logout modal
 function closeLogoutModal() {
   logoutModalz.style.display = 'none';
 }

 // Event listener for showing the logoutModal
 logoutModalz.addEventListener('click', showLogoutModal);


 // Event listener for the close button in the modal
 closeModalz.addEventListener('click', closeLogoutModal);

 // Event listener for the "Log Out" button in the modal
 confirmLogout.addEventListener('click', () => {
   // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
  console.log('Logging out...');

   // Close the modal after logout
   closeLogoutModal();
 });

// declared outside for better functionality
const fetchProfileImage = async () => {
  try {
    // Fetch the profile image URL from the server
    const response = await fetch('/profile-image');
    const responseData = await response.json();

    if (response.ok) {
      const imageUrl = responseData.user;
      
      return imageUrl; // Return the fetched image data
    } else if (response.status === 401) {
      return null; // User is not logged in, return null for no image data
    } else {
      throw new Error('Failed to fetch profile image URL');
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}
// Define the UIHandler object outside the DOMContentLoaded event listener
const UIHandler = {
  showLoggedInUI: async function() {
    try {
      // Update the UI to show elements for logged-in users
      const signupButton = document.getElementById('signupButton');
      const loginButton = document.getElementById('loginButton');
      const profileSettings = document.getElementById('profileSettings');
      const profileImage = document.getElementById('profile-image');

      signupButton.style.display = 'none';
      loginButton.style.display = 'none';
      profileSettings.style.display = 'block';

      // Call fetchProfileImage to get the image data
      const imageData = await fetchProfileImage();

      // Get the image element
      const profileImageElement = document.getElementById('profile-image');

      if (imageData) {
        // Display the profile settings with the fetched image data
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${imageData}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;
      } else {
        // User has not uploaded a profile image, use the default image
        const defaultImagePath = 'https://i.imgur.com/r79g1jQ.jpg'; // Replace with the correct default image path
        // Display the profile settings with the default image
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${defaultImagePath}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;
      }

        // Add event listener to toggle dropdown menu
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
              // Open the sign-up modal when the sign-up button is clicked
      document.getElementById("logoutButton").addEventListener("click", function() {
        document.getElementById("logoutModal").style.display = "block";
      });

      
   
      // Event listener for showing the logoutModal
      logoutModalz.addEventListener('click', showLogoutModal);

       // Event listener for the close button in the modal
      closeModalz.addEventListener('click', closeLogoutModal);

      // Event listener for the "Log Out" button in the modal
      confirmLogout.addEventListener('click', () => {
        // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
      console.log('Logging out...');

        // Close the modal after logout
        closeLogoutModal();
      });
      
      
    } catch (error) {
      console.error('Error fetching profile image:', error);
      // Handle the error or set a default image
      const defaultImagePath = 'https://i.imgur.com/r79g1jQ.jpg';
      const profileSettings = document.getElementById('profileSettings');
      console.log(defaultImagePath)
    
        // Display the profile settings with the fetched image data
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${defaultImagePath}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;

        // Add event listener to toggle dropdown menu
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
              // Open the sign-up modal when the sign-up button is clicked
      document.getElementById("logoutButton").addEventListener("click", function() {
        document.getElementById("logoutModal").style.display = "block";
      });

      
   
      // Event listener for showing the logoutModal
      logoutModalz.addEventListener('click', showLogoutModal);

       // Event listener for the close button in the modal
      closeModalz.addEventListener('click', closeLogoutModal);

      // Event listener for the "Log Out" button in the modal
      confirmLogout.addEventListener('click', () => {
        // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
      console.log('Logging out...');

        // Close the modal after logout
        closeLogoutModal();
      });
      
    }
  }
};


// client.js
async function checkLoginStatus() {
  try {
    const response = await fetch('/api/login-status');
    const data = await response.json();

    // data.isLoggedIn will be true if the user is logged in
    // Update the UI based on the login status
    if (data.isLoggedIn) {
      // Show a logged-in user interface
      UIHandler.showLoggedInUI(); // Call the showLoggedInUI function through the UIHandler object
    } else {
      // Show a non-logged-in user interface
      showNonLoggedInUI();
    }
  } catch (error) {
    console.error('Error fetching login status:', error);
   
  }
};

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});


// DOMContent Loaded fetch Profile and ShowLoggedinUI
document.addEventListener('DOMContentLoaded', async () => {
  const profileImage = document.getElementById('profile-image');
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');
  const profileSettings = document.getElementById('profileSettings');

  const fetchProfileImage = async () => {
    try {
      // Fetch the profile image URL from the server
      const response = await fetch('/profile-image');
      const responseData = await response.json();

      if (response.ok) {
        const imageUrl = responseData.user;
        // const imageData = responseData.url; // Assuming the server sends JSON data with the image URL
        return imageUrl; // Return the fetched image data
      } else if (response.status === 401) {
        return null; // User is not logged in, return null for no image data
      } else {
        throw new Error('Failed to fetch profile image URL');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      throw error; // Re-throw the error to handle it in the caller function
    }
  };
const UIHandler = {
    showLoggedInUI: async function()  {
    try {
      // Update the UI to show elements for logged-in users
      // Remove the "Register" and "Log In" button
      const signupButton = document.getElementById('signupButton');
      const loginButton = document.getElementById('loginButton');
      const profileSettings = document.getElementById('profileSettings');
      const profileImage = document.getElementById('profile-image');

      signupButton.style.display = 'none';
      loginButton.style.display = 'none';
      profileSettings.style.display = 'block';

      // Call fetchProfileImage to get the image data
      const imageData = await fetchProfileImage();

      // Get the image element
      const profileImageElement = document.getElementById('profile-image');

      if (imageData) {
        // User has an uploaded profile image
        profileImage.src = imageData;
      } else {
        // User has not uploaded a profile image, use the default image
        const defaultImagePath = '/public/uploads/blank_man.jpg';
        profileImage.src = defaultImagePath;
      }
        // Display the profile settings with the fetched image data
        profileSettings.innerHTML = `
          <div id="profile-dropdown">
            <img src="${imageData}" class="profile-img" id="profile-image" alt="User Profile" />
            <ul class="dropdown-menu">
              <li><a href="profile.html">Profile</a></li>
              <li><a href="dashboard.html">Dashboard</a></li>
              <li><a href="#" id="logoutButton">Logout</a></li>
            </ul>
          </div>
        `;

        // Add event listener to toggle dropdown menu
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

                  // Open the sign-up modal when the sign-up button is clicked
      document.getElementById("logoutButton").addEventListener("click", function() {
        document.getElementById("logoutModal").style.display = "block";
      });

      // Event listener for the close button in the modal
      closeModalz.addEventListener('click', closeLogoutModal);

      // Event listener for showing the logoutModal
      logoutModalz.addEventListener('click', showLogoutModal);
      
      // Event listener for the "Log Out" button in the modal
      confirmLogout.addEventListener('click', () => {
        // Add logout functionality here (e.g., clear session data, redirect to login page, etc.)
      console.log('Logging out...');

        // Close the modal after logout
        closeLogoutModal();
      });
    } catch (error) {
      console.error('Error fetching profile image:', error);
  
      // If there's an error fetching the profile image, show the default image
      const defaultImagePath = '/public/uploads/blank_man.jpg';
  
      // Display the profile settings with the default image
      profileSettings.innerHTML = `
        <div id="profile-dropdown">
          <img src="${defaultImagePath}" class="profile-img" id="profile-image" alt="User Profile" />
          <ul class="dropdown-menu">
            <li><a href="profile.html">Profile</a></li>
            <li><a href="dashboard.html">Dashboard</a></li>
            <li><a href="#" id="logoutButton">Logout</a></li>
          </ul>
        </div>
      `;
        // Show the logged-in UI with the default image
      UIHandler.showLoggedInUI();
    }
  }
}
  });
  
function showNonLoggedInUI() {
  // Update the UI to show elements for non-logged-in users
   const signupButton = document.getElementById('signupButton');
   const loginButton = document.getElementById('loginButton');
   const profileSettings = document.getElementById('profileSettings');
  
   profileSettings.style.display = 'none';
   signupButton.style.display = 'block';
   loginButton.style.display = 'block';
  document.getElementById('loginForm').style.display = 'block';
 
 }












  