function testFunction() {
    console.log("Hello from your JavaScript file!");
    console.log("limbaroka ka")
  }
  
  testFunction();

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
             <img src="https://i.imgur.com/r79g1jQ.jpg" class="profile-image" alt="User Profile" />
             <ul class="dropdown-menu">
               <li><a href="profile.html">Profile</a></li>
               <li><a href="dashboard.html">Dashboard</a></li>
               <li><a href="#" id="logoutButton">Logout</a></li>
             </ul>
       </div>
         `;
         document.addEventListener("click", function (event) {
           const dropdown = document.querySelector(".dropdown-menu");
           const profileImage = document.getElementById("profile-dropdown");
         
           if (!profileImage.contains(event.target)) {
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


}


function showNonLoggedInUI() {
 // Update the UI to show elements for non-logged-in users
  // Remove the "Register" and "Log In" buttons
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const profileSettings = document.getElementById('profileSettings');
 //  const profileInfo = document.getElementById('profile-info');
 //  profileInfo.classList.remove('show');
  profileSettings.style.display = 'none';
  signupButton.style.display = 'block';
  loginButton.style.display = 'block';
 document.getElementById('loginForm').style.display = 'block';

}

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', () => {
 checkLoginStatus();
 console.log(checkLoginStatus)
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
 console.log('Logging out...'); // Replace with actual logout code

  // Close the modal after logout
  closeLogoutModal();
});


// Sample data for upcoming trips and recent bookings
const upcomingTrips = [
  "Trip to Cebu - August 2023",
  "Beach vacation in Palawan - September 2023",
  "Coral Reef Adventure in Tubattaha - October 2023",
];

const recentBookings = [
  "Hotel in Cebu - July 2023",
  "Resort in Siargao - July 2023",
  "Tour package to El Nido - June 2023",
];

// Function to populate the upcoming trips list
function populateUpcomingTrips() {
  const upcomingTripsList = document.getElementById("upcomingTripsList");
  upcomingTrips.forEach((trip) => {
    const li = document.createElement("li");
    li.textContent = trip;
    upcomingTripsList.appendChild(li);
  });
}

// Function to populate the recent bookings list
function populateRecentBookings() {
  const recentBookingsList = document.getElementById("recentBookingsList");
  recentBookings.forEach((booking) => {
    const li = document.createElement("li");
    li.textContent = booking;
    recentBookingsList.appendChild(li);
  });
}

// Call the functions to populate the lists on page load
document.addEventListener("DOMContentLoaded", () => {
  populateUpcomingTrips();
  populateRecentBookings();
});



